import CityBusItem from '@/app/bus/components/CityBusItem';
import CityBusRoute from '@/app/bus/components/CityBusRoute';
import { HomeBusProps } from '@/types/homeType';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const HomeBusItem = ({ bus }: { bus: HomeBusProps }) => {
  return (
    <View style={styles.container}>
      <CityBusRoute origin={bus.origin} destination={bus.destination} />
      <CityBusItem
        arrivalBus={{ busNumber: bus.busNumber, remainingTime: bus.remainingTime, busColor: bus.busColor }} />
    </View>
  );
};

export default HomeBusItem;

const styles = StyleSheet.create({
  container: {}
});
