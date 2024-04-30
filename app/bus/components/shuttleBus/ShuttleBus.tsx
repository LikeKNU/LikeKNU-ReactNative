import { useShuttleRoutes } from '@/api/bus';
import ShuttleRouteListItem from '@/app/bus/components/shuttleBus/ShuttleRouteListItem';
import { FlatList, StyleSheet } from 'react-native';

const ShuttleBus = () => {
  const { data } = useShuttleRoutes();

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data}
      renderItem={({ item }) => <ShuttleRouteListItem shuttleRoute={item} />
      }
      keyExtractor={item => item.shuttleId}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ShuttleBus;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});
