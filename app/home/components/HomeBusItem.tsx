import CityBusItem from '@/app/bus/components/cityBus/CityBusItem';
import CityBusRoute from '@/app/bus/components/cityBus/CityBusRoute';
import { HomeBusProps } from '@/types/homeType';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const HomeBusItem = ({ bus }: { bus: HomeBusProps }) => {
  return (
    <>
      <CityBusRoute origin={bus.origin} destination={bus.destination} />
      <View style={styles.cityBus}>
        <CityBusItem
          arrivalBus={{ busNumber: bus.busNumber, remainingTime: bus.remainingTime, busColor: bus.busColor }} />
      </View>
    </>
  );
};

export default HomeBusItem;

const styles = StyleSheet.create({
  cityBus: {
    paddingVertical: 6,
    marginBottom: 6
  }
});
