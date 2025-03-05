import { useMeals } from '@/api/meal';
import DateSelector from '@/app/meal/components/DateSelector';
import MealItem from '@/app/meal/components/MealItem';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { CafeteriaProps, MenuProps } from '@/types/mealTypes';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, useWindowDimensions, View } from 'react-native';

export interface MealViewProps {
  cafeteria: CafeteriaProps,
  isActive: boolean
}

const MealView = ({ cafeteria, isActive }: MealViewProps) => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const [dateIndex, setDateIndex] = useState<number>(0);
  const [meals, setMeals] = useState<MenuProps[]>([]);
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const { data, isLoading, mutate } = useMeals(cafeteria, { enabled: shouldFetch });

  useFocusEffect(useCallback(() => {
    setDateIndex(0);
  }, []));

  useEffect(() => {
    if (isActive && !shouldFetch) {
      setShouldFetch(true);
    }
  }, [isActive]);

  useEffect(() => {
    setMeals(data ? data[dateIndex].meals : []);
  }, [data, dateIndex]);

  const handleChangeDate = (index: number) => {
    setDateIndex(index);
  };

  const MealItemList = ({ meals }: { meals: MenuProps[] }) => {
    return (
      <FlatList
        data={meals}
        renderItem={({ item }) => <MealItem menu={item} isToday={dateIndex === 0} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor={colors[theme].gray100}
            refreshing={isLoading}
            onRefresh={mutate}
          />
        }
      />
    );
  };

  return (
    <View style={[styles.container, { width: width - 40 }]}>
      <DateSelector
        active={dateIndex}
        handleChangeDate={handleChangeDate}
      />
      {meals.length === 0 ?
        <View style={styles.emptyMessage}>
          <FontText fontWeight="500" style={{ color: colors[theme].gray100 }}>
            운영하지 않는 날이에요
          </FontText>
        </View>
        : <MealItemList meals={meals} />}
    </View>
  );
};

export default MealView;

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  pressableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  emptyMessage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
