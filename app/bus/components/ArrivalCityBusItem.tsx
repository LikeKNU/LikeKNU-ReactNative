import CityBusItem from '@/app/bus/components/CityBusItem';
import CityBusRoute from '@/app/bus/components/CityBusRoute';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { BusArrivalProps, CityBusProps } from '@/types/busTypes';
import { FlatList, StyleSheet, View } from 'react-native';

interface ArrivalCityBusItemProps {
  arrivalCityBus: CityBusProps;
}

const ArrivalCityBusItem = ({ arrivalCityBus }: ArrivalCityBusItemProps) => {
  const { theme } = useTheme();
  const departure = `${arrivalCityBus.departureStop} 출발`;
  const data: BusArrivalProps[] = arrivalCityBus.buses.length == 0 ? [{
    busNumber: null,
    busColor: null,
    remainingTime: null
  }] : arrivalCityBus.buses;

  return (
    <View style={styles.container}>
      <View style={[styles.routeContainer, { backgroundColor: colors[theme].gray300 }]}>
        <CityBusRoute origin={arrivalCityBus.origin} destination={arrivalCityBus.destination} />
        <FontText fontWeight="500" style={{ color: colors[theme].gray100, fontSize: 12 }}>{departure}</FontText>
      </View>
      <FlatList
        style={{ paddingHorizontal: 10, marginTop: 6 }}
        data={data}
        renderItem={({ item }) => <View style={styles.cityBus}>
          <CityBusItem arrivalBus={item} />
        </View>}
        keyExtractor={item => item.busNumber! + item.remainingTime}
      />
    </View>
  );
};

export default ArrivalCityBusItem;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6
  },
  cityBus: {
    paddingVertical: 4
  }
});
