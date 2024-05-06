import ShuttleRoute from '@/app/bus/components/shuttleBus/ShuttleRoute';
import AnimatedButton from '@/common/components/AnimatedButton';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { ShuttleRouteProps } from '@/types/busTypes';
import { StyleSheet, View } from 'react-native';

export interface ShuttleRouteListItemProps {
  shuttleRoute: ShuttleRouteProps,
  onPress: (shuttleId: string, note: string | null) => void;
}

const ShuttleRouteListItem = ({ shuttleRoute, onPress }: ShuttleRouteListItemProps) => {
  const { theme } = useTheme();
  const names = shuttleRoute.shuttleName.split(' → ');
  const departureTime = shuttleRoute.nextDepartureTime;

  const handleOnPress = () => {
    onPress(shuttleRoute.shuttleId, shuttleRoute.note);
  };

  return (
    <View style={[styles.container, { borderBottomColor: colors[theme].gray300 }]}>
      <View>
        <ShuttleRoute origin={names[0]} destination={names[1]} />
        <View style={styles.departureTimeContainer}>
          <FontText style={{ color: colors[theme].gray100 }}>{'다음 출발: '}</FontText>
          <FontText style={{ color: colors.red }}>{departureTime ?? '금일 종료'}</FontText>
        </View>
      </View>
      <AnimatedButton onPress={handleOnPress}>
        <FontText fontWeight="600" style={{ color: colors[theme].gray100 }}>더보기</FontText>
      </AnimatedButton>
    </View>
  );
};

export default ShuttleRouteListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,

    borderBottomWidth: 0.5
  },
  departureTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
