import GrayIconDark from '@/assets/icons/gray-icon-dark.svg'
import GrayIconLight from '@/assets/icons/gray-icon-light.svg'
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import { campusColors } from '@/constants/colors';
import { StyleSheet, View } from 'react-native';

const HomeHeader = () => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        {theme === 'light' ? <GrayIconLight width={34} height={34} /> : <GrayIconDark width={34} height={34} />}
        <FontText fontWeight="700" style={[styles.campus, { color: campusColors['cheonan'] }]}>{'천안캠'}</FontText>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 10,
    paddingHorizontal: 20
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  campus: {
    fontSize: 24,
    marginLeft: -4
  },
  content: {
    fontSize: 22
  }
});
