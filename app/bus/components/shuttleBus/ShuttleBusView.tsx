import { useShuttleBuses } from '@/api/bus';
import ShuttleBusItem from '@/app/bus/components/shuttleBus/ShuttleBusItem';
import { FlatList, View } from 'react-native';

const ShuttleBusView = ({ shuttleId }: { shuttleId: string }) => {
  const { data } = useShuttleBuses(shuttleId);

  return (
    <View style={{ width: '100%' }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ShuttleBusItem shuttleBus={item} />}
        keyExtractor={item => item.busName}
      />
    </View>
  );
};

export default ShuttleBusView;
