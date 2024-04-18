import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import { campusColors } from '@/constants/colors';
import { StyleSheet, View } from 'react-native';

const CampusSelector = () => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <FontText fontWeight="700" style={[styles.campus, { color: campusColors['cheonan'] }]}>{'천안캠'}</FontText>
      {/*<ArrowDownIcon fill={colors[theme].lightGray} width={24} height={24} />*/}
    </View>
  );
};

export default CampusSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  campus: {
    fontSize: 32
  }
});
