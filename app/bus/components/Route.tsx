import CaretRightIcon from '@/assets/icons/caret-right.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { StyleSheet, View } from 'react-native';

const Route = ({ origin, destination }: { origin: string, destination: string }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <FontText fontWeight="600" style={styles.name}>{origin}</FontText>
      <CaretRightIcon style={styles.icon} width={18} height={18} fill={colors[theme].gray200} />
      <FontText fontWeight="600" style={styles.name}>{destination}</FontText>
    </View>
  );
};

export default Route;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4
  },
  name: {
    fontSize: 16
  },
  icon: {
    marginHorizontal: 10
  }
});
