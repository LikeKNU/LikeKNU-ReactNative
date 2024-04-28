import BreakfastIcon from '@/assets/icons/breakfast.svg';
import DinnerIcon from '@/assets/icons/dinner.svg';
import LunchIcon from '@/assets/icons/lunch.svg';
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { MealType } from '@/types/mealTypes';
import { StyleSheet, View } from 'react-native';

const MealTypeItem = ({ mealType }: { mealType: MealType }) => {
  const { theme } = useTheme();

  const getMealIcon = (mealType: MealType) => {
    switch (mealType) {
      case '아침':
        return <BreakfastIcon width={24} height={24} fill={colors[theme].contrast} />;
      case '점심':
        return <LunchIcon width={24} height={24} fill={colors[theme].contrast} />;
      case '저녁':
        return <DinnerIcon width={24} height={24} fill={colors[theme].contrast} />;
    }
  };

  return (
    <View style={styles.container}>
      {getMealIcon(mealType)}
      <FontText fontWeight="700" style={styles.mealType}>{mealType}</FontText>
    </View>
  );
};

export default MealTypeItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mealType: {
    fontSize: 16,
    marginLeft: 4
  },
});
