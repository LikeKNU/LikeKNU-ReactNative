import { useCityBusArrivalTime } from '@/api/bus';
import BusArrivalTimeListItem from '@/app/bus/timetable/components/BusArrivalTimeListItem';
import CaretDownIcon from '@/assets/icons/caret-down.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

export interface BusTimetableProps {
  routeId: string;
}

const BusTimetableView = ({ routeId }: BusTimetableProps) => {
  const { theme } = useTheme();
  const { data } = useCityBusArrivalTime(routeId);
  const flatListRef = useRef<BottomSheetFlatListMethods>(null);

  const nextArrivalIndex = useMemo(() => {
    if (!data || !data.buses) return -1;
    const now = new Date();
    return data.buses.findIndex(bus => {
      const arrivalTime = new Date();
      const [hours, minutes] = bus.arrivalAt!.split(':');
      arrivalTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
      return arrivalTime >= now;
    });
  }, [data]);

  useEffect(() => {
    if (nextArrivalIndex !== -1 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: nextArrivalIndex,
          animated: true,
          viewPosition: 0.3
        })
      }, 510);
    }
  }, [nextArrivalIndex]);


  const itemHeight = 59;
  const getItemLayout = (data: any, index: number) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  });

  return (
    <>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontText fontWeight="700" style={styles.stopName}>{data && data.departureStop}</FontText>
          <FontText style={styles.suffix}>정류장</FontText>
        </View>
        <CaretDownIcon style={styles.icon} width={18} height={18} fill={colors[theme].gray200} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontText fontWeight="700" style={styles.stopName}>{data && data.arrivalStop}</FontText>
          <FontText style={styles.suffix}>정류장</FontText>
        </View>
      </View>
      <BottomSheetFlatList
        ref={flatListRef}
        contentContainerStyle={styles.contentContainer}
        data={data && data.buses}
        renderItem={({ item, index }) =>
          <BusArrivalTimeListItem
            arrivalBus={item}
            isNext={index === nextArrivalIndex}
          />}
        keyExtractor={item => `${item.busNumber} + ${item.arrivalAt}`}
        showsVerticalScrollIndicator={false}
        getItemLayout={getItemLayout}
      />
    </>
  );
};

export default BusTimetableView;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingBottom: 10
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20
  },
  stopName: {
    fontSize: 17
  },
  icon: {
    marginVertical: 4
  },
  suffix: {
    marginLeft: 4
  }
});
