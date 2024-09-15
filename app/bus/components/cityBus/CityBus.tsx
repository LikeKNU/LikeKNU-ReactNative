import { useCityBuses } from '@/api/bus';
import CityBusView from '@/app/bus/components/cityBus/CityBusView';
import RefreshButton from '@/app/bus/components/cityBus/RefreshButton';
import RouteTypeSelector from '@/app/bus/components/cityBus/RouteTypeSelector';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import { routeType } from '@/constants/bus';
import { Campuses } from '@/constants/campus';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';

const CityBus = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<Swiper>(null);
  const { data: outgoingData, mutate: outgoingMutate } = useCityBuses(routeType.OUTGOING);
  const { data: incomingData, mutate: incomingMutate } = useCityBuses(routeType.INCOMING);
  const { campus } = useCampus();
  const router = useRouter();

  useEffect(() => {
    swiperRef.current?.scrollTo(activeIndex);
  }, [activeIndex]);

  const mutate = async () => {
    activeIndex === 0 ? await outgoingMutate() : await incomingMutate();
  };

  const changeRouteType = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <View style={styles.header}>
        <RouteTypeSelector activeIndex={activeIndex} handleOnPress={changeRouteType} />
        {campus === Campuses.YESAN &&
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', padding: 6 }}
                     onPress={() => router.push('/bus/timetable')}>
            <FontText fontWeight="600" style={{ color: colors[theme].gray100 }}>전체 시간표</FontText>
            <ArrowRightIcon />
          </Pressable>}
      </View>
      <Swiper
        ref={swiperRef}
        showsButtons={false}
        loop={false}
        onIndexChanged={setActiveIndex}
        showsPagination={false}
      >
        {Object.values(routeType).map(routeType => (
          <View key={routeType.value} style={styles.page}>
            <CityBusView data={routeType.value === 'incoming' ? incomingData : outgoingData} />
          </View>
        ))}
      </Swiper>
      <RefreshButton mutate={mutate} focusPathname={'/bus'} style={styles.refreshButton} />
    </>
  );
};

export default CityBus;

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    paddingHorizontal: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  refreshButton: {
    position: 'absolute',
    bottom: 20,
    right: 20
  }
});
