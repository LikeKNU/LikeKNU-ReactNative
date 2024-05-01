import { useCityBuses } from '@/api/bus';
import CityBusView from '@/app/bus/components/cityBus/CityBusView';
import RefreshButton from '@/app/bus/components/cityBus/RefreshButton';
import RouteTypeSelector from '@/app/bus/components/cityBus/RouteTypeSelector';
import { routeType } from '@/constants/bus';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';

const CityBus = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<Swiper>(null);
  const { data: incomingData, mutate: incomingMutate } = useCityBuses(routeType.INCOMING);
  const { data: outgoingData, mutate: outgoingMutate } = useCityBuses(routeType.OUTGOING);

  useEffect(() => {
    swiperRef.current?.scrollTo(activeIndex);
  }, [activeIndex]);

  const mutate = async () => {
    activeIndex === 0 ? await incomingMutate() : await outgoingMutate();
  };

  const changeRouteType = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <RouteTypeSelector activeIndex={activeIndex} handleOnPress={changeRouteType} />
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
  refreshButton: {
    position: 'absolute',
    bottom: 20,
    right: 20
  }
});
