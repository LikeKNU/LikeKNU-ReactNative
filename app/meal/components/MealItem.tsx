import MealTypeItem from '@/app/meal/components/MealTypeItem';
import MenusItem from '@/app/meal/components/MenusItem';
import OperatingTimeItem from '@/app/meal/components/OperatingTimeItem';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import { OperatingStatus } from '@/constants/meal';
import { MenuProps, OperatingType } from '@/types/mealTypes';
import { determineTimeStatus } from '@/utils/date';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { LayoutChangeEvent } from 'react-native/Libraries/Types/CoreEventTypes';

const MealItem = ({ menu, isToday }: { menu: MenuProps, isToday: boolean }) => {
  const operatingStatus = isToday ? determineTimeStatus(menu.operatingTime) : OperatingStatus.PREPARE as OperatingType;
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState<boolean>(operatingStatus !== OperatingStatus.END);
  const animatedHeight = useRef(new Animated.Value(operatingStatus !== OperatingStatus.END ? 1 : 0)).current;
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
    inputRange: [0, 0.99, 1],
    outputRange: [52, contentHeight + 52 + 20, 220]
  });

  return (
    <Animated.View style={[styles.container, {
      backgroundColor: colors[theme].gray300,
      maxHeight: interpolatedHeight
    }]}>
      <Pressable style={styles.pressable} onPress={handleOnPress}>
        <View style={styles.header}>
          <MealTypeItem mealType={menu.mealType} />
          <OperatingTimeItem operatingTime={menu.operatingTime} isToday={isToday} />
        </View>
        <ArrowDownIcon width={24} height={24} fill={colors[theme].gray200} />
      </Pressable>
      <MenusItem onLayout={onContentLayout} menus={menu.menus} />
    </Animated.View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 26,
    paddingVertical: 14,
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
