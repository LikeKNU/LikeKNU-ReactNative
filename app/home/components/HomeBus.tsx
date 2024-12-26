import { useHomeBuses } from '@/api/home';
import ChristmasRefreshButton from '@/app/bus/components/cityBus/ChristmasRefreshButton';
import RefreshButton from '@/app/bus/components/cityBus/RefreshButton';
import HomeBusItem from '@/app/home/components/HomeBusItem';
import CardContainer from '@/common/components/CardContainer';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';

const HomeBus = () => {
  const { data, mutate } = useHomeBuses();
  const router = useRouter();

  return (
    <Pressable style={styles.container} onPress={() => router.navigate('/bus')}>
      <CardContainer title="버스" style={{ paddingBottom: 4 }}>
        <View style={{ flexDirection: 'row' }}>
          <FlatList
            scrollEnabled={false}
            data={data}
            renderItem={
              ({ item }) => <HomeBusItem bus={item} />
            }
            keyExtractor={(item) => item.routeId}
          />
          <View style={{ justifyContent: 'flex-end', paddingBottom: 10 }}>
            <ChristmasRefreshButton mutate={mutate} focusPathname={'/'} />
          </View>
        </View>
        <Image source={require('@/assets/icons/bonfire.png')} style={{ width: 28, height: 28,  position: 'absolute', bottom: 0, right: 134}} />
        <Image source={require('@/assets/icons/snowman.png')} style={{ width: 58, height: 58,  position: 'absolute', bottom: 0, right: 72}} />
      </CardContainer>
    </Pressable>
  );
};

export default HomeBus;

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  content: {
    fontSize: 13,
    marginBottom: 4
  }
});
