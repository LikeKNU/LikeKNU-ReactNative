import { useMeals } from '@/api/meal';
import DateSelector from '@/app/meal/components/DateSelector';
import MealCardContainer from '@/app/meal/components/MealCardContainer';
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { Cafeterias } from '@/constants/meal';
import { MenuProps } from '@/types/mealTypes';
import { useState } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

const MealView = ({ cafeteria }: { cafeteria: Cafeterias }) => {
  const { theme } = useTheme();
  const { data, isLoading } = useMeals(cafeteria);
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const todayMeals: MenuProps[] = data ? data[0].meals : [];
  const tomorrowMeals: MenuProps[] = data ? data[1].meals : [];

  const handleChangeDate = (index: number) => {
    setActiveIndex(index);
  };

  const getMeals = () => {
    return activeIndex === 0 ? todayMeals : tomorrowMeals;
  };

  return (
    <View style={[styles.container, { width: width - 40 }]}>
      <DateSelector
        active={activeIndex}
        handleChangeDate={handleChangeDate}
      />
      {getMeals().length === 0 ?
        <View style={styles.emptyMessage}>
          <FontText fontWeight="500" style={{ color: colors[theme].gray100 }}>
            운영하지 않는 날이에요
          </FontText>
        </View>
        : <FlatList
          data={getMeals()}
          renderItem={({ item }) => <MealCardContainer menu={item} />}
          showsVerticalScrollIndicator={false}
        />}
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
