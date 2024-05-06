import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { ScheduleProps } from '@/types/calendarTypes';
import { StyleSheet, View } from 'react-native';

interface ScheduleItemProps {
  schedule: ScheduleProps;
}

const ScheduleItem = ({ schedule }: ScheduleItemProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { borderLeftColor: colors[theme].contrast }]}>
      <FontText fontWeight="500"
                style={[styles.date, { color: colors[theme].gray100 }]}>{schedule.scheduleDate}</FontText>
      <FontText fontWeight="500">{schedule.scheduleContents}</FontText>
    </View>
  );
};

export default ScheduleItem;

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 2,
    paddingLeft: 16,
    paddingVertical: 8,
    marginLeft: 10
  },
  date: {
    fontSize: 13
  }
});
