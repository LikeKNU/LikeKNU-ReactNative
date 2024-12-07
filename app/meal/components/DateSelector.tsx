import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors, { campusColors } from '@/constants/colors';
import * as Haptics from 'expo-haptics';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

interface DateSelectorProps {
  handleChangeDate: (index: number) => void,
  active: number
}

const DateSelector = ({ handleChangeDate, active }: DateSelectorProps) => {
  const { theme } = useTheme();
  const day = ['일', '월', '화', '수', '목', '금', '토'];
  const { campus } = useCampus();

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  }

  const getDayColor = (dayIndex: number) => {
    if (dayIndex === 0) return colors[theme].red;
    return colors[theme].contrast;
  };

  const DateButton = ({ index, date }: { index: number, date: Date }) => {
    const dayIndex = date.getDay();
    const dayColor = getDayColor(dayIndex);

    return (
      <Pressable
        onPress={() => {
          handleChangeDate(index);
          Platform.OS === 'ios' && Haptics.selectionAsync();
        }}
        style={styles.buttonContainer}
      >
        <View style={{
          alignItems: 'center',
          borderRadius: 100,
          backgroundColor: active === index ? colors[theme].gray300 : 'none',
          paddingVertical: 8,
          width: 38,
          borderWidth: index === 0 ? 1 : 0,
          borderColor: campusColors[campus!],
          opacity: active === index ? 1 : 0.9
        }}>
          <FontText fontWeight={active === index ? '700' : '400'}
                    style={{ fontSize: 16, color: dayColor }}>{date.getDate()}</FontText>
          <FontText fontWeight={active === index ? '700' : '400'}
                    style={{ color: dayColor }}>{day[dayIndex]}</FontText>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10
    }}>
      {generateDates().map((date, index) => <DateButton key={index} index={index} date={date} />)}
    </View>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 2
  }
});
