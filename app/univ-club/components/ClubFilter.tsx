import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import { clubCategoryName } from '@/constants/clubCategories';
import colors, { campusColors } from '@/constants/colors';
import { ClubTypes } from '@/types/univClubTypes';
import { FlatList, Platform, Pressable, StyleSheet, View } from 'react-native';

export interface ClubFilterProps {
  filter: ClubTypes | null;
  setFilter: (filter: ClubTypes | null) => void;
}

const ClubFilter = ({ filter, setFilter }: ClubFilterProps) => {
  const { theme } = useTheme();
  const { campus } = useCampus();

  const handlePressFilter = (item: ClubTypes) => {
    filter === item ? setFilter(null) : setFilter(item)
  };

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        data={Object.values(ClubTypes)} renderItem={({ item }) => {
        return (
          <Pressable
            style={{
              gap: 4,
              paddingVertical: 8,
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: Platform.OS === 'ios' ? colors[theme].shadow : colors[theme].elevation,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 4,
              shadowOpacity: 1,
              elevation: 6,
              borderRadius: 50,
              backgroundColor: filter === item ? campusColors[campus!] : colors.light.gray200,
              opacity: !filter ? 1 : filter === item ? 1 : 0.3
            }}
            onPress={() => handlePressFilter(item)}
          >
            <FontText fontWeight="600"
                      style={{ color: !filter ? colors.dark.contrast : filter === item ? colors.dark.contrast : colors.light.contrast }}>{clubCategoryName[item]}</FontText>
          </Pressable>
        );
      }}
        horizontal={true}
      />
    </View>
  );
};

export default ClubFilter;

const styles = StyleSheet.create({
  contentContainer: {
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});
