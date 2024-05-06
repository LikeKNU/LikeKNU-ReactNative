import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import { Campuses, campusName } from '@/constants/campus';
import colors, { campusColors } from '@/constants/colors';
import { FlatList, Pressable, StyleSheet } from 'react-native';

const CampusSetting = () => {
  const { theme } = useTheme();
  const { campus: selectedCampus, changeCampus } = useCampus();

  const isSelected = (campus: Campuses) => {
    return selectedCampus === campus;
  };

  const CampusButton = ({ campus }: { campus: Campuses }) => {
    return (
      <Pressable style={[styles.campusButton, {
        backgroundColor: isSelected(campus) ? colors[theme].container : colors[theme].background,
        shadowColor: colors[theme].shadow
      }]}
                 onPress={() => changeCampus(campus)}>
        <FontText fontWeight="700"
                  style={{
                    fontSize: 18,
                    color: campusColors[campus],
                    opacity: isSelected(campus) ? 1 : 0.3
                  }}>{campusName[campus].name}</FontText>
      </Pressable>
    );
  };

  return (
    <FlatList
      style={{ marginBottom: 20 }}
      contentContainerStyle={styles.buttonContainer}
      data={Object.values(Campuses)}
      renderItem={({ item }) => <CampusButton campus={item} />}
      scrollEnabled={false}
    />
  );
};

export default CampusSetting;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10
  },
  campusButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 1
  }
});
