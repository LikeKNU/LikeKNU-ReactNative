import { useHomeCalendar } from '@/api/home';
import CalendarItem from '@/app/calendar/components/CalendarItem';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import CardContainer from '@/common/components/CardContainer';
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { HomeCalendarProps } from '@/types/homeType';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

const HomeCalendar = () => {
  // const { data, isLoading, error } = useHomeCalendar();
  const data: HomeCalendarProps[] = [];
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={{ flex: 1, marginLeft: 5 }}>
      <Pressable onPress={() => router.push('/calendar')}>
        <CardContainer
          title={
            <View style={styles.titleContainer}>
              <FontText fontWeight="700" style={styles.title}>학사일정</FontText>
              <ArrowRightIcon />
            </View>
          }
          style={{ height: 232 }}
        >
          {data && data.length > 0 ? (
            <FlatList
              scrollEnabled={false}
              data={data}
              renderItem={
                ({ item }) => <CalendarItem item={item} />}
            />
          ) : (
            <View>
              <FontText style={[styles.emptyMessage, { color: colors[theme].gray200 }]} numberOfLines={1}>
                4주 이내에 일정이 없어요
              </FontText>
            </View>
          )}
        </CardContainer>
      </Pressable>
    </View>
  );
};

export default HomeCalendar;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 18
  },
  emptyMessage: {
    fontSize: 12
  }
});
