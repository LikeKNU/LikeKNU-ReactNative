import { useCityBusRoutes } from '@/api/bus';
import BusRouteListItem from '@/app/bus/components/BusRouteListItem';
import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import { CityBusRouteProps } from '@/types/busTypes';
import { calculateTimeRemaining } from '@/utils/date';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

const CityBusTimetablePage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { data, isLoading, mutate } = useCityBusRoutes();

  const handleOnPress = (routeId: string) => {
    router.navigate({ pathname: '/bus/timetable/details', params: { routeId: routeId } });
  };

  const busRouteListItem = useCallback((item: CityBusRouteProps) => {
    const time = item.nextArrivalTime && calculateTimeRemaining(item.nextArrivalTime);
    return (
      <BusRouteListItem
        origin={item.origin}
        destination={item.destination}
        time={time!}
        onPress={() => handleOnPress(item.routeId!)}
      />
    );
  }, [handleOnPress]);

  return (
    <PageLayout edges={['top']}>
      <BackHeader title="버스 시간표" />
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        renderItem={({ item }) => busRouteListItem(item)}
        keyExtractor={item => item.routeId!}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor={colors[theme].gray100}
            refreshing={isLoading}
            onRefresh={mutate}
          />
        }
      />
    </PageLayout>
  );
};

export default CityBusTimetablePage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  }
});
