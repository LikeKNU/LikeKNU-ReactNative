import ArrivalCityBusItem from '@/app/bus/components/cityBus/ArrivalCityBusItem';
import { CityBusProps } from '@/types/busTypes';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

const CityBusView = ({ data }: { data?: CityBusProps[] }) => {
  return (
    <View style={[styles.container, { width: '100%' }]}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 30 }}
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
