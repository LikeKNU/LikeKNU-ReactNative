import { useShuttleBuses } from '@/api/bus';
import ShuttleBusItem from '@/app/bus/components/shuttleBus/ShuttleBusItem';
import { FlatList, View } from 'react-native';

const ShuttleBusView = ({ shuttleId, bottomSheetIndex }: { shuttleId: string, bottomSheetIndex: number }) => {
  const { data } = useShuttleBuses(shuttleId);
  const height = bottomSheetIndex === 0 ? '75%' : '100%';

  return (
    <View style={{ width: '100%', height: height }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ShuttleBusItem shuttleBus={item} />}
        keyExtractor={item => item.busName}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ShuttleBusView;
