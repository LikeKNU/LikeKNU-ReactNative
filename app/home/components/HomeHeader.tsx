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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {theme === 'light' ? <GrayIconLight width={38} height={38} /> : <GrayIconDark width={38} height={38} />}
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

    paddingVertical: 10
  },
  campus: {
    fontSize: 24,
    marginLeft: -6
  },
  content: {
    fontSize: 22
  }
});
