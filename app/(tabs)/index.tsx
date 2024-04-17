import { useSchedules } from '@/api/test';
import ScheduleListItem from '@/components/schedule/ScheduleListItem';
import FontText from '@/components/text/FontText';
import { ScheduleProps } from '@/types/scheduleType';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainPage = () => {
  const { data: schedules, error, isLoading, mutate } = useSchedules();

  return (
    <SafeAreaView>
      <FontText style={styles.title}>메인</FontText>
      <FlatList
        data={schedules}
        renderItem={({ item }: { item: ScheduleProps }) => <ScheduleListItem
          scheduleList={item} />}
        keyExtractor={item => item.scheduleCriterion}
      />
    </SafeAreaView>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  title: { fontWeight: '700', fontSize: 32, textAlign: 'center' }
});
