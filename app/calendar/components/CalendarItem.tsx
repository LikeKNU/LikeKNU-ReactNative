import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { ScheduleProps } from '@/types/calendarTypes';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const CalendarItem = ({ item }: { item: ScheduleProps }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <FontText fontWeight="500" style={[styles.date, { color: colors[theme].gray100 }]}>
        {item.scheduleDate}
      </FontText>
      <FontText fontWeight="500"
                style={[styles.contents, { color: item.isToday ? colors.blue : colors[theme].contrast }]}>{item.scheduleContents}</FontText>
    </View>
  );
};

export default CalendarItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  date: {
    fontSize: 11
  },
  contents: {
    fontSize: 12
  }
});
