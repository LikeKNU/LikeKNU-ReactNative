import ShuttleTimeView from '@/app/bus/components/shuttleBus/ShuttleTimeView';
import FontText from '@/common/text/FontText';
import { ShuttleBusProps } from '@/types/busTypes';
import { StyleSheet, View } from 'react-native';

interface ShuttleBusItemProps {
  shuttleBus: ShuttleBusProps;
}

const ShuttleBusItem = ({ shuttleBus }: ShuttleBusItemProps) => {
  return (
    <View>
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
