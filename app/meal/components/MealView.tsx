import { useMeals } from '@/api/meal';
import DateSelector from '@/app/meal/components/DateSelector';
import MealItem from '@/app/meal/components/MealItem';
import PinAngleIcon from '@/assets/icons/pin-angle.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { Cafeterias } from '@/constants/meal';
import { MenuProps } from '@/types/mealTypes';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

export interface MealViewProps {
  cafeteria: Cafeterias;
  handleChangeFavorite: (cafeteria: Cafeterias) => void;
  favoriteCafeteria: string | null;
}

const MealView = ({ cafeteria, handleChangeFavorite, favoriteCafeteria }: MealViewProps) => {
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

  const MealItemList = ({ meals }: { meals: MenuProps[] }) => {
    return (
      <FlatList
        data={meals}
        renderItem={({ item }) => <MealItem menu={item} isToday={dateIndex === 0} />}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={[styles.container, { width: width - 40 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <DateSelector
          active={dateIndex}
          handleChangeDate={handleChangeDate}
        />
        <Pressable style={{ padding: 4 }} onPress={() => handleChangeFavorite(cafeteria)}>
          <PinAngleIcon width={26} height={26}
                        fill={favoriteCafeteria === cafeteria ? colors.red : colors[theme].gray200} />
        </Pressable>
      </View>
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
  emptyMessage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
