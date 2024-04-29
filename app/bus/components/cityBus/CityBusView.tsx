import { useCityBuses } from '@/api/bus';
import ArrivalCityBusItem from '@/app/bus/components/cityBus/ArrivalCityBusItem';
import RefreshButton from '@/app/bus/components/cityBus/RefreshButton';
import { CityBusProps } from '@/types/busTypes';
import { ValueNameType } from '@/types/common';
import React from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

const CityBusView = ({ routeType, data }: { routeType: ValueNameType, data?: CityBusProps[] }) => {
  // const { data, mutate } = useCityBuses(routeType);
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width: width - 40 }]}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ArrivalCityBusItem arrivalCityBus={item} />}
        showsVerticalScrollIndicator={false}
      />
      {/*<RefreshButton mutate={mutate} focusPathname={'/bus'} style={styles.refreshButton} />*/}
    </View>
  );
};

export default CityBusView;

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  refreshButton: {
    position: 'absolute',
    bottom: 20,
    right: 20
  }
});
