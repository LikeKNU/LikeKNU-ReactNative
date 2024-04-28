import { useMeals } from '@/api/meal';
import DateSelector from '@/app/meal/components/DateSelector';
import MealCardContainer from '@/app/meal/components/MealCardContainer';
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { Cafeterias } from '@/constants/meal';
import { MenuProps } from '@/types/mealTypes';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

const MealView = ({ cafeteria }: { cafeteria: Cafeterias }) => {
  const { theme } = useTheme();
  const { data, isLoading } = useMeals(cafeteria);
  const { width } = useWindowDimensions();
  const [dateIndex, setDateIndex] = useState<number>(0);
  const [meals, setMeals] = useState<MenuProps[]>([]);

  useEffect(() => {
    setMeals(data ? data[dateIndex].meals : []);
  }, [data, dateIndex]);

  const handleChangeDate = (index: number) => {
    setDateIndex(index);
  };

  const CardList = ({ meals }: { meals: MenuProps[] }) => {
    return (
      <FlatList
        data={meals}
        renderItem={({ item }) => <MealCardContainer menu={item} isToday={dateIndex === 0} />}
        showsVerticalScrollIndicator={false}
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
        : <CardList meals={meals} />}
    </View>
  );
};

export default MealView;

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  emptyMessage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
