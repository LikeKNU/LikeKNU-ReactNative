import { useShuttleBuses } from '@/api/bus';
import ShuttleBusItem from '@/app/bus/components/shuttleBus/ShuttleBusItem';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { FlatList, View } from 'react-native';

const ShuttleBusView = ({ shuttleId, note }: { shuttleId: string, note: string | null }) => {
  const { data } = useShuttleBuses(shuttleId);

  return (
    <View style={{ width: '100%' }}>
      {note && <FontText style={{ textAlign: 'center', color: colors.red, marginBottom: 10 }}>{note}</FontText>}
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
