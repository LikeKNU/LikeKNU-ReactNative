import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import campusMapIcons from '@/constants/campusMapIcons';
import colors from '@/constants/colors';
import { placeName } from '@/constants/places';
import { PlaceTypes } from '@/types/campusMapTypes';
import { FlatList, Platform, Pressable, StyleSheet, View } from 'react-native';

export interface MarkerFilterProps {
  filter: PlaceTypes | null;
  setFilter: (filter: PlaceTypes | null) => void;
}

const MarkerFilter = ({ filter, setFilter }: MarkerFilterProps) => {
  const { theme } = useTheme();

  const handlePressFilter = (item: PlaceTypes) => {
    filter === item ? setFilter(null) : setFilter(item)
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        data={Object.values(PlaceTypes)} renderItem={({ item }) => {
        const Icon = campusMapIcons[item];
        return (
          <Pressable
            style={{
              gap: 4,
              paddingVertical: 8,
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: Platform.OS === 'ios' ? colors.light.shadow : colors[theme].elevation,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 4,
              shadowOpacity: 1,
              elevation: 6,
              borderRadius: 50,
              backgroundColor: filter === item ? colors[theme].container : colors.light.gray200,
              opacity: !filter ? 1 : filter === item ? 1 : 0.6,
            }}
            onPress={() => handlePressFilter(item)}
          >
            <Icon />
            <FontText fontWeight="600"
                      style={{ color: !filter ? colors.dark.contrast : filter === item ? colors[theme].contrast : colors.light.contrast }}>{placeName[item]}</FontText>
          </Pressable>
        );
      }}
        horizontal={true}
      />
    </View>
  );
};

export default MarkerFilter;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100
  },
  contentContainer: {
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});
