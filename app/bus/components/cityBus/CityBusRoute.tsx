import CaretRightIcon from '@/assets/icons/caret-right.svg'
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { CityBusRouteProps } from '@/types/busTypes';
import { StyleSheet, View } from 'react-native';

const CityBusRoute = ({ origin, destination }: CityBusRouteProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <FontText>{origin}</FontText>
      <CaretRightIcon style={styles.icon} width={16} height={16}
                      fill={colors[theme].gray200} />
      <FontText>{destination}</FontText>
    </View>
  );
};

export default CityBusRoute;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 8
  }
})
