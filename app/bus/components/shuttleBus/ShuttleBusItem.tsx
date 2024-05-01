import ShuttleTimeItem from '@/app/bus/components/shuttleBus/ShuttleTimeItem';
import FontText from '@/common/text/FontText';
import { ShuttleBusProps } from '@/types/busTypes';
import { View } from 'react-native';

interface ShuttleBusItemProps {
  shuttleBus: ShuttleBusProps;
}

const ShuttleBusItem = ({ shuttleBus }: ShuttleBusItemProps) => {
  return (
    <View>
      <FontText fontWeight="500" style={{ fontSize: 16, marginBottom: 10 }}>{shuttleBus.busName}</FontText>
      <ShuttleTimeItem shuttleTimes={shuttleBus.times} />
    </View>
  );
};

export default ShuttleBusItem;
