import MealTypeItem from '@/app/meal/components/MealTypeItem';
import MenusItem from '@/app/meal/components/MenusItem';
import OperatingTimeItem from '@/app/meal/components/OperatingTimeItem';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg';
import { useTheme } from '@/common/components/ThemeContext';
import colors from '@/constants/colors';
import { MenuProps } from '@/types/mealTypes';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { LayoutChangeEvent } from 'react-native/Libraries/Types/CoreEventTypes';

const MealCardContainer = ({ menu }: { menu: MenuProps }) => {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState<boolean>(true);
  const { width } = useWindowDimensions();
  const animatedHeight = useRef(new Animated.Value(1)).current;
  const [contentHeight, setContentHeight] = useState<number>(56);


  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: expanded ? 1 : 0,
      duration: 400,
      useNativeDriver: false
    }).start();
  }, [expanded]);

  const handleOnPress = () => {
    setExpanded(prevState => !prevState);
  };

  const onContentLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height !== 0) {
      setContentHeight(height);
    }
  };

  const interpolatedHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [56, contentHeight + 56 + 20]
  });

  return (
    <Animated.View style={[styles.container, {
      backgroundColor: colors[theme].gray300,
      width: width - 40,
      height: interpolatedHeight
    }]}>
      <Pressable style={styles.pressable} onPress={handleOnPress}>
        <View style={styles.header}>
          <MealTypeItem mealType={menu.mealType} />
          <OperatingTimeItem operatingTime={menu.operatingTime} />
        </View>
        <ArrowDownIcon width={24} height={24} fill={colors[theme].gray200} />
      </Pressable>
      <MenusItem onLayout={onContentLayout} menus={menu.menus} />
    </Animated.View>
  );
};

export default MealCardContainer;

const styles = StyleSheet.create({
  container: {
    // height: 56,
    borderRadius: 26,
    paddingVertical: 16,
    paddingHorizontal: 20,

    marginBottom: 10,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 16
  }
});
