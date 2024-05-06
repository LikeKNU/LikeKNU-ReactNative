import ShuttleTimeItem from '@/app/bus/components/shuttleBus/ShuttleTimeItem';
import { ShuttleTimeProps } from '@/types/busTypes';
import { FlatList, StyleSheet, View } from 'react-native';

export interface ShuttleTimeViewProps {
  shuttleTimes: ShuttleTimeProps[];
  isRunning: boolean;
}

const ShuttleTimeView = ({ shuttleTimes, isRunning }: ShuttleTimeViewProps) => {
  const size = shuttleTimes.length;

  return (
    <View style={styles.container}>
      <FlatList
        data={shuttleTimes}
        renderItem={({ item, index }) =>
          <ShuttleTimeItem
            arrivalStop={item.arrivalStop}
            arrivalTime={item.arrivalTime}
            isRunning={isRunning}
            isLast={index === size - 1}
          />
        }
        scrollEnabled={false}
      />
    </View>
  );
};

export default ShuttleTimeView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2
  }
});
