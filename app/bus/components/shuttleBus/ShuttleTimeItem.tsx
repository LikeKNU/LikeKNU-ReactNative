import FontText from '@/common/text/FontText';
import { ShuttleTimeProps } from '@/types/busTypes';
import { FlatList } from 'react-native';

const ShuttleTimeItem = ({ shuttleTimes }: { shuttleTimes: ShuttleTimeProps[] }) => {
  const size = shuttleTimes.length;

  return (
    <FlatList
      style={{ marginBottom: 20, paddingHorizontal: 20 }}
      data={shuttleTimes}
      renderItem={({ item }) => <FontText>{item.arrivalStop}</FontText>}
    />
  );
};

export default ShuttleTimeItem;
