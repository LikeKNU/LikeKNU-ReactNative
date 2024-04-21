import BusFrontIcon from '@/assets/icons/bus-front.svg';
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { BusArrivalProps } from '@/types/busType';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

const CityBusItem: FC<{ arrivalBus: BusArrivalProps }> = ({ arrivalBus }) => {
  const { theme } = useTheme();

  if (!arrivalBus.busNumber) {
    return <FontText fontWeight="400" style={[styles.emptyMessage, { color: colors[theme].gray100 }]}>
      30분 안으로 오는 버스가 없어요
    </FontText>
  }

  return (
    <View style={styles.container}>
      <BusFrontIcon width={22} height={22} fill={`#${arrivalBus.busColor}`} />
      <FontText fontWeight="700" style={styles.busNumber}>{arrivalBus.busNumber}</FontText>
      <FontText fontWeight="300" style={{ fontSize: 14, color: colors.red, marginLeft: 12 }}>
        {arrivalBus.remainingTime}
      </FontText>
    </View>
  );
};

export default CityBusItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 6,
    marginBottom: 6
  },
  busNumber: {
    fontSize: 16,
    marginLeft: 2
  },
  remainingTime: {
    padding: 6,
    borderRadius: 6,
    marginLeft: 12
  },
  emptyMessage: {
    fontSize: 14,

    paddingVertical: 10,
    marginBottom: 6
  }
});
