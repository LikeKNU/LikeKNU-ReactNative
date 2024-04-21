import { useHomeBuses } from '@/api/home';
import RefreshButton from '@/app/bus/components/RefreshButton';
import HomeBusItem from '@/app/home/components/HomeBusItem';
import CardContainer from '@/common/components/CardContainer';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

const HomeBus = () => {
  const { data, isLoading, error, mutate } = useHomeBuses();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.navigate('/bus')}>
        <CardContainer title="버스" style={{ paddingBottom: 4 }}>
          <View style={{ flexDirection: 'row' }}>
            <FlatList
              scrollEnabled={false}
              data={data}
              renderItem={
                ({ item }) => <HomeBusItem bus={item} />
              }
            />
            <View style={{ justifyContent: 'flex-end', paddingBottom: 10 }}>
              <RefreshButton mutate={mutate} />
            </View>
          </View>
        </CardContainer>
      </Pressable>
    </View>
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
