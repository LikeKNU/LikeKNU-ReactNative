import ShuttleTimeView from '@/app/bus/components/shuttleBus/ShuttleTimeView';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { ShuttleBusProps } from '@/types/busTypes';
import { StyleSheet, View } from 'react-native';

interface ShuttleBusItemProps {
  shuttleBus: ShuttleBusProps;
}

const ShuttleBusItem = ({ shuttleBus }: ShuttleBusItemProps) => {
  const { theme } = useTheme();

  return (
    <View
      style={{ borderBottomWidth: 0.5, borderBottomColor: colors[theme].gray300, marginBottom: 20, paddingBottom: 20 }}>
      <FontText fontWeight="500" style={styles.busName}>{shuttleBus.busName}</FontText>
      <ShuttleTimeView shuttleTimes={shuttleBus.times} isRunning={shuttleBus.isRunning} />
    </View>
  );
};

export default ShuttleBusItem;

const styles = StyleSheet.create({
  busName: {
    fontSize: 16,
    marginBottom: 10
  }
});
