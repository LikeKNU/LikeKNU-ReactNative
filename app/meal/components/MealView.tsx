import { useMeals } from '@/api/meal';
import MealCardContainer from '@/app/meal/components/MealCardContainer';
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { Cafeterias } from '@/constants/meal';
import { MenuProps } from '@/types/mealTypes';
import { FlatList, View } from 'react-native';

const MealView = ({ cafeteria }: { cafeteria: Cafeterias }) => {
  const { theme } = useTheme();
  const { data, isLoading } = useMeals(cafeteria);
  const meals: MenuProps[] = data ? data[0].meals : [];

  if (meals.length === 0) {
    return (
        <FontText fontWeight="500" style={{color: colors[theme].gray100, marginTop: 10}}>운영하지 않는 날이에요</FontText>
    );
  }

  return (
    <FlatList
      data={meals}
      renderItem={({ item }) => <MealCardContainer menu={item} />}
    />
  );
};

export default MealView;
