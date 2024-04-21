import CaretRightIcon from '@/assets/icons/caret-right.svg'
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { StyleSheet, View } from 'react-native';

export interface CityBusRouteProps {
  origin: string;
  destination: string;
}

const CityBusRoute = ({ origin, destination }: CityBusRouteProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <FontText fontWeight="400" style={styles.name}>{origin}</FontText>
      <CaretRightIcon style={styles.icon} width={16} height={16}
                      fill={colors[theme].gray200} />
      <FontText fontWeight="400" style={styles.name}>{destination}</FontText>
    </View>
  );
};

export default CityBusRoute;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 13
  },
  icon: {
    marginHorizontal: 8
  }
})
