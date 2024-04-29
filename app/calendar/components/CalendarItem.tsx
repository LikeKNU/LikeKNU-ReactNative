import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { CalendarProps } from '@/types/calendarTypes';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const CalendarItem = ({ item }: { item: CalendarProps }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <FontText fontWeight="500" style={[styles.date, { color: colors[theme].gray100 }]}>
        {item.scheduleDate}
      </FontText>
      <FontText style={[styles.contents]}>{item.scheduleContents}</FontText>
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
