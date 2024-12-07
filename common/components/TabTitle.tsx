import { useCampus } from '@/common/contexts/CampusContext';
import FontText from '@/common/text/FontText';
import { campusName } from '@/constants/campus';
import { campusColors } from '@/constants/colors';
import { StyleSheet, View } from 'react-native';

const TabTitle = ({ title }: { title: string }) => {
  const { campus } = useCampus();

  return (
    <View style={styles.container}>
      <FontText fontWeight="700" style={styles.title}>{title}</FontText>
      {campus && <FontText fontWeight="700"
                           style={[styles.campus, { color: campusColors[campus] }]}>{campusName[campus].name}</FontText>}
    </View>
  );
};

export default TabTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4
  },
  title: {
    fontSize: 22
  },
  campus: {
    fontSize: 15,
    marginBottom: 2
  }
});
