import BusFrontIcon from '@/assets/icons/bus-front.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { BusArrivalProps } from '@/types/busTypes';
import { StyleSheet, View } from 'react-native';

const CityBusItem = ({ arrivalBus }: { arrivalBus: BusArrivalProps }) => {
  const { theme } = useTheme();

  if (!arrivalBus.busNumber) {
    return <FontText style={[styles.emptyMessage, { color: colors[theme].gray100 }]}>
      30분 안으로 오는 버스가 없어요
    </FontText>
  }

  return (
    <View style={styles.container}>
      <BusFrontIcon width={22} height={22} fill={`#${arrivalBus.busColor}`} />
      <FontText fontWeight="700" style={styles.busNumber}>{arrivalBus.busNumber}</FontText>
      <FontText style={[styles.remainingTime, { color: colors.red }]}>
        {arrivalBus.remainingTime}
      </FontText>
    </View>
  );
};

export default CityBusItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  busNumber: {
    fontSize: 16,
    width: 48
  },
  remainingTime: {
    marginLeft: 12
  },
  emptyMessage: {
    fontSize: 13
  }
});
