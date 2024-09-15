import { useCityBusRoutes } from '@/api/bus';
import BusRouteListItem from '@/app/bus/components/BusRouteListItem';
import BusTimetableView from '@/app/bus/timetable/components/BusTimetableView';
import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import { CityBusRouteProps } from '@/types/busTypes';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

const CityBusTimetablePage = () => {
  const { theme } = useTheme();
  const { data, isLoading, mutate } = useCityBusRoutes();
  const [routeId, setRouteId] = useState<string>('');
  const snapPoints = useMemo(() => ['80%'], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOnPress = (routeId: string) => {
    setRouteId(routeId);
    bottomSheetRef.current?.present();
  };

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.5}
    />
  ), []);

  const busRouteListItem = useCallback((item: CityBusRouteProps) => {
    const time = item.nextArrivalTime && item.nextArrivalTime.slice(0, -3);
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
      <BottomSheetModalProvider>
        <FlatList
          contentContainerStyle={styles.container}
          data={data}
          renderItem={({ item }) => busRouteListItem(item)}
          keyExtractor={item => item.routeId!}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={mutate}
            />
          }
        />
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: colors[theme].container }}
          handleIndicatorStyle={{ backgroundColor: colors[theme].gray200 }}
          backdropComponent={renderBackdrop}
        >
          <BusTimetableView routeId={routeId} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </PageLayout>
  );
};

export default CityBusTimetablePage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  }
});
