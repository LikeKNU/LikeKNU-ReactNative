import RenderText from '@/app/wiki/components/RenderText';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import BookBookmarkIcon from '@/assets/icons/book-bookmark.svg';
import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors, { campusColors } from '@/constants/colors';
import { wikiMock } from '@/constants/wikiMock';
import { Content } from '@/types/wikiTypes';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Wiki = () => {
  const { theme } = useTheme();
  const { campus } = useCampus();
  const { width, height } = useWindowDimensions();
  const sideWidth = width * 0.6;
  const { bottom } = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(width)).current;
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedContents, setSelectedContents] = useState<(Content[] | null)>(null);
  const buttonSlideAnim = useRef(new Animated.Value(0)).current;
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(true);
  const buttonTimeoutRef = useRef<NodeJS.Timeout>();
  const [isFirstTouch, setIsFirstTouch] = useState<boolean>(true);

  const toggleCategory = (identifier: string) => {
    if (expandedCategories.includes(identifier)) {
      setExpandedCategories(expandedCategories.filter(id => id !== identifier));
    } else {
      setExpandedCategories([...expandedCategories, identifier]);
    }
  };

  const handleSelectCategory = (identifier: string) => {
    setSelectedCategory(identifier);

    const foundCategory = wikiMock.find(category =>
      category.identifier === identifier || category.contents.some(content => 'identifier' in content && content.identifier === identifier)
    );

    if (!foundCategory) {
      setSelectedContents(null);
      return;
    }

    if (!foundCategory.hasMinorCategories) {
      setSelectedContents((foundCategory.contents as Content[]).length > 0 ? (foundCategory.contents as Content[]) : null);
    } else {
      const foundSubCategory = foundCategory.contents.find(
        content => 'identifier' in content && content.identifier === identifier
      );

      setSelectedContents(
        foundSubCategory && 'contents' in foundSubCategory && foundSubCategory.contents.length > 0
          ? (foundSubCategory.contents as Content[])
          : null
      );
    }

    closeSidebar();
  };

  const openSidebar = () => {
    setIsOpen(true);
    Animated.spring(slideAnim, {
      toValue: width - sideWidth,
      useNativeDriver: true,
      friction: 8,
      tension: 40
    }).start();
  };

  const addAlphaToHexColor = (hexColor: string, alpha: number): string => {
    const validAlpha = Math.max(0, Math.min(1, alpha));
    const alphaHex = Math.round(validAlpha * 255).toString(16).padStart(2, '0');
    const cleanHex = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
    return `#${cleanHex}${alphaHex}`;
  };

  useEffect(() => {
    startHideTimer();

    return () => {
      if (buttonTimeoutRef.current) {
        clearTimeout(buttonTimeoutRef.current);
      }
    };
  }, []);

  const startHideTimer = () => {
    if (buttonTimeoutRef.current) {
      clearTimeout(buttonTimeoutRef.current);
    }

    buttonTimeoutRef.current = setTimeout(() => {
      Animated.spring(buttonSlideAnim, {
        toValue: 30,
        useNativeDriver: true,
        friction: 8,
        tension: 40
      }).start();
      setIsButtonVisible(false);
    }, 1_500);
  };

  const handleButtonPress = () => {
    if (buttonTimeoutRef.current) {
      clearTimeout(buttonTimeoutRef.current);
    }

    if (!isButtonVisible) {
      setIsButtonVisible(true);
      Animated.spring(buttonSlideAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 40
      }).start();
      startHideTimer();
    } else {
      toggleSidebar();
    }
  };

  const closeSidebar = () => {
    setIsOpen(false);
    Animated.spring(slideAnim, {
      toValue: width,
      useNativeDriver: true,
      friction: 8,
      tension: 40
    }).start();
    startHideTimer();
  };

  const toggleSidebar = () => {
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };

  return (
    <PageLayout edges={['top']}>
      <BackHeader title="위키" />
      <View style={{ flex: 1, paddingLeft: 20, paddingRight: 40, gap: 6 }}>
        {isOpen && <Pressable style={styles.overlay} onPress={closeSidebar} />}
        {selectedContents &&
          <FlatList
            contentContainerStyle={{ paddingBottom: bottom + 20 }}
            data={selectedContents}
            renderItem={({ item }) => <RenderText content={item} />}
            showsVerticalScrollIndicator={false}
            bounces={false}
          />}

        {/* 사이드바 */}
        <Animated.View
          style={[
            styles.sidebar,
            {
              transform: [{ translateX: Animated.subtract(slideAnim, width) }],
              backgroundColor: colors[theme].container,
              width: sideWidth,
              right: -sideWidth,
              top: height * 0.1,
              bottom: bottom + 20,
              shadowColor: Platform.OS === 'ios' ? colors[theme].gray200 : colors[theme].elevation
            }
          ]}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: 12 }} style={styles.sidebarContent}
                      showsVerticalScrollIndicator={false} bounces={false}>
            {wikiMock.map((item, index) => {
              const isExpanded = expandedCategories.includes(item.identifier);
              const hasMinorCategories = item.hasMinorCategories;
              const isSelected = !hasMinorCategories && selectedCategory === item.identifier;

              return (
                <View key={index}>
                  <TouchableOpacity
                    style={[
                      styles.category,
                      isSelected && {
                        ...styles.selectedCategory,
                        backgroundColor: addAlphaToHexColor(campusColors[campus!], 0.11)
                      }
                    ]}
                    onPress={() => hasMinorCategories ? toggleCategory(item.identifier) : handleSelectCategory(item.identifier)}
                  >
                    <FontText fontWeight="700"
                              style={[styles.categoryText, isSelected ? { color: campusColors[campus!] } : {}]}>{item.majorCategory}</FontText>
                    {hasMinorCategories && (
                      <ArrowRightIcon style={{ transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] }} />
                    )}
                  </TouchableOpacity>

                  {isExpanded && hasMinorCategories && (
                    <View style={styles.minorCategoryContainer}>
                      {item.contents.map((subItem, subIndex) => {
                        const isSelected = 'identifier' in subItem && selectedCategory === subItem.identifier;

                        return (
                          <TouchableOpacity
                            key={subIndex}
                            style={[
                              styles.minorCategory,
                              isSelected && {
                                ...styles.selectedCategory,
                                backgroundColor: addAlphaToHexColor(campusColors[campus!], 0.11)
                              }
                            ]}
                            onPress={() => handleSelectCategory('identifier' in subItem ? subItem.identifier : '')}
                          >
                            <FontText fontWeight={isSelected ? '600' : '500'}
                                      style={[styles.minorCategoryText, isSelected ? { color: campusColors[campus!] } : {}]}>{'minorCategory' in subItem ? subItem.minorCategory : ''}</FontText>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </Animated.View>

        {/* 사이드바 버튼 */}
        <Animated.View
          style={[
            styles.contentsButton,
            {
              backgroundColor: campusColors[campus!],
              transform: [
                { translateX: Animated.subtract(slideAnim, width) },
                { translateX: buttonSlideAnim }
              ]
            }
          ]}
        >
          <Pressable
            style={{ padding: 8 }}
            onPress={handleButtonPress}
          >
            <BookBookmarkIcon width={36} height={36} fill="white" />
          </Pressable>
        </Animated.View>
      </View>
    </PageLayout>
  );
};

export default Wiki;

const styles = StyleSheet.create({
  contentsButton: {
    position: 'absolute',
    right: 0,
    bottom: 120,
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3
  },
  sidebar: {
    position: 'absolute',
    elevation: 16,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 12,
    shadowOpacity: 0.8,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    zIndex: 2
  },
  sidebarContent: {
    padding: 16
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  categoryText: {
    fontSize: 17
  },
  minorCategoryContainer: {
    paddingLeft: 12
  },
  minorCategory: {
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  selectedCategory: {
    borderRadius: 8
  },
  minorCategoryText: {
    fontSize: 15
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 1
  }
});
