import ChristmasCityBusItem from '@/app/bus/components/cityBus/ChristmasCityBusItem';
import ChristmasCityBusRoute from '@/app/bus/components/cityBus/ChristmasCityBusRoute';
import { HomeBusProps } from '@/types/homeType';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const HomeBusItem = ({ bus }: { bus: HomeBusProps }) => {
  return (
    <>
      <ChristmasCityBusRoute origin={bus.origin} destination={bus.destination} />
      <View style={styles.cityBus}>
        <ChristmasCityBusItem
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
