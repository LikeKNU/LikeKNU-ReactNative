import ArrivalCityBusItem from '@/app/bus/components/cityBus/ArrivalCityBusItem';
import { CityBusProps } from '@/types/busTypes';
import React from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

const CityBusView = ({ data }: { data?: CityBusProps[] }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width: width - 40 }]}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ArrivalCityBusItem arrivalCityBus={item} />}
        showsVerticalScrollIndicator={false}
      />
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
