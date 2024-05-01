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
        backgroundColor: isSelected(campus) ? campusColors[campus] : colors[theme].gray300,
        shadowColor: colors[theme].background
      }]}
                 onPress={() => changeCampus(campus)}>
        <FontText fontWeight="700"
                  style={{
                    fontSize: 22,
                    color: isSelected(campus) ? colors[theme].container : campusColors[campus],
                    opacity: isSelected(campus) ? 1 : 0.5
                  }}>{campusName[campus].name}</FontText>
      </Pressable>
    );
  };

  return (
    <>
      <FontText fontWeight="600" style={[styles.title, { color: colors[theme].gray100 }]}>캠퍼스</FontText>
      <FlatList
        contentContainerStyle={styles.buttonContainer}
        data={Object.values(Campuses)}
        renderItem={({ item }) => <CampusButton campus={item} />}
        scrollEnabled={false}
      />
    </>
  );
};

export default CampusSetting;

const styles = StyleSheet.create({
  title: {
    fontSize: 18
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  campusButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1
  }
});
