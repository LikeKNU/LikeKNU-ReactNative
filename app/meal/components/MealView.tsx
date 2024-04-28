import { useMeals } from '@/api/meal';
import FontText from '@/common/text/FontText';
import { Cafeterias } from '@/constants/meal';
import { MenuProps } from '@/types/mealTypes';
import { FlatList } from 'react-native';

const MealView = ({ cafeteria }: { cafeteria: Cafeterias }) => {
  const { data, isLoading } = useMeals(cafeteria);
  const meals: MenuProps[] = data ? data[0].meals : [];

  return (
    <FlatList
      data={meals}
      renderItem={({ item }) => <FontText>{item.menus}</FontText>}
    />
  );
};

export default MealView;
