import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors, { campusColors } from '@/constants/colors';
import { ShuttleTimeProps } from '@/types/busTypes';
import { StyleSheet, View } from 'react-native';

export interface ShuttleTimeItemProps extends ShuttleTimeProps {
  isRunning: boolean;
  isLast: boolean;
}

const ShuttleTimeItem = ({ arrivalStop, arrivalTime, isRunning, isLast }: ShuttleTimeItemProps) => {
  const { theme } = useTheme();
  const { campus } = useCampus();
  const color = isRunning ? campusColors[campus!] : colors[theme].gray100;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.stopContainer}>
          <View style={[styles.circleGraphics, { borderColor: color }]} />
          <FontText fontWeight="500" style={styles.stopName}>{arrivalStop}</FontText>
        </View>
        <FontText fontWeight="500" style={{ color: colors[theme].gray100 }}>{arrivalTime}</FontText>
      </View>
      {!isLast && <View style={[styles.lineGraphics, { backgroundColor: color }]}></View>}
    </>
  );
};

export default ShuttleTimeItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  stopContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circleGraphics: {
    borderWidth: 3,
    borderRadius: 7,
    width: 14,
    height: 14
  },
  stopName: {
    marginLeft: 6
  },
  lineGraphics: {
    height: 16,
    width: 3,
    marginLeft: 5,
    marginVertical: -2
  }
});
