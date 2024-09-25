import Route from '@/app/bus/components/Route';
import AnimatedButton from '@/common/components/AnimatedButton';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { StyleSheet, View } from 'react-native';

interface RouteListItemProps {
  onPress: () => void,
  origin: string,
  destination: string,
  time: string | null
}

const BusRouteListItem = ({ onPress, origin, destination, time }: RouteListItemProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { borderBottomColor: colors[theme].gray300 }]}>
      <View>
        <Route origin={origin} destination={destination} />
        <View style={styles.departureTimeContainer}>
          <FontText style={{ color: colors[theme].gray100 }}>{'다음 버스: '}</FontText>
          <FontText style={{ color: colors[theme].red }}>{(!time || time === '') ? '없음' : time}</FontText>
        </View>
      </View>
      <AnimatedButton onPress={onPress}>
        <FontText fontWeight="600" style={{ color: colors[theme].gray100 }}>더보기</FontText>
      </AnimatedButton>
    </View>
  );
};

export default BusRouteListItem;

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
