import { useCityBuses } from '@/api/bus';
import ArrivalCityBusItem from '@/app/bus/components/ArrivalCityBusItem';
import RefreshButton from '@/app/bus/components/RefreshButton';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { SectionList, StyleSheet, View } from 'react-native';

const CityBus = () => {
  const { theme } = useTheme();
  const { outgoingData, incomingData, mutate } = useCityBuses();
  const sectionsData = [
    {
      title: '학교에서 출발 ➡️',
      data: outgoingData ?? []
    },
    {
      title: '학교로 도착 ⬅️',
      data: incomingData ?? []
    }
  ];

  return (
    <>
      <SectionList
        style={{ paddingHorizontal: 20 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        sections={sectionsData}
        renderItem={({ item }) => <ArrivalCityBusItem arrivalCityBus={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={[styles.stickyHeaderContainer, { backgroundColor: colors[theme].container }]}>
            <FontText fontWeight="600"
                      style={[styles.stickyHeader, { color: colors[theme].gray100 }]}>{title}</FontText>
          </View>
        )}
        stickySectionHeadersEnabled={true}
      />
      <RefreshButton mutate={mutate} focusPathname={'/bus'} style={styles.refreshButton} />
    </>
  );
};

export default CityBus;

const styles = StyleSheet.create({
  refreshButton: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  stickyHeaderContainer: {
    paddingVertical: 20
  },
  stickyHeader: {
    fontSize: 18
  }
});
