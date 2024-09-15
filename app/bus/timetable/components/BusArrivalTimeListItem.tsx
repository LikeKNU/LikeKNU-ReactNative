import BusFrontIcon from '@/assets/icons/bus-front.svg';
import AnimatedPressable from '@/common/components/AnimatedPressable';
import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors, { campusColors } from '@/constants/colors';
import { BusArrivalProps } from '@/types/busTypes';
import { hexToRgba } from '@/utils/color';
import { StyleSheet, View } from 'react-native';

interface BusArrivalTimeListItemProps {
  arrivalBus: BusArrivalProps;
  isNext: boolean;
}

const BusArrivalTimeListItem = ({ arrivalBus, isNext }: BusArrivalTimeListItemProps) => {
  const { theme } = useTheme();
  const { campus } = useCampus();

  const calculateTimeRemaining = (arrivalTime: string): string => {
    const now = new Date();
    const [hours, minutes] = arrivalTime.split(':').map(Number);
    const arrival = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    if (arrival < now) {
      return '';
    }
    const diffInMinutes = Math.round((arrival.getTime() - now.getTime()) / 60000);
    if (diffInMinutes < 1) {
      return '도착';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 후`;
    } else {
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      return `${hours}시간 ${minutes}분 후`;
    }
  };

  return (
    <AnimatedPressable animatedViewStyle={{ borderRadius: 8 }}
                       style={[styles.container, {
                         borderBottomColor: colors[theme].gray300,
                         backgroundColor: isNext ? hexToRgba(campusColors[campus!], 0.1) : 'transparent',
                       }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <BusFrontIcon width={22} height={22} fill={`#${arrivalBus.busColor}`} opacity={theme === 'dark' ? 0.9 : 1} />
        <FontText fontWeight="700" style={styles.busNumber}>{arrivalBus.busNumber}</FontText>
        <FontText style={styles.arrivalTime}>{arrivalBus.arrivalAt?.slice(0, -3)}</FontText>
        <FontText
          style={[styles.remainingTime, { color: colors[theme].gray100 }]}>{calculateTimeRemaining(arrivalBus.arrivalAt!)}</FontText>
      </View>
      {isNext && <FontText fontWeight="600" style={{ color: colors[theme].red }}>다음 버스</FontText>}
    </AnimatedPressable>
  );
};

export default BusArrivalTimeListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 20
  },
  busNumber: {
    fontSize: 16,
    width: 52,
    marginLeft: 2
  },
  arrivalTime: {
    marginLeft: 6
  },
  remainingTime: {
    marginLeft: 8
  }
});
