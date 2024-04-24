import BellIcon from '@/assets/icons/bell.svg';
import GrayIconDark from '@/assets/icons/gray-icon-dark.svg'
import GrayIconLight from '@/assets/icons/gray-icon-light.svg'
import { useTheme } from '@/common/components/ThemeContext';
import useCampus from '@/common/hooks/useCampus';
import FontText from '@/common/text/FontText';
import { campusName } from '@/constants/campus';
import { campusColors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

const HomeHeader = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { campus } = useCampus();

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        {theme === 'light' ? <GrayIconLight width={34} height={34} /> : <GrayIconDark width={34} height={34} />}
        {campus && <FontText fontWeight="700" style={[styles.campus, { color: campusColors[campus] }]}>
          {campusName[campus].name}
        </FontText>}
      </View>
      <View style={styles.menuIcons}>
        <Pressable onPress={() => router.push('/notification')}>
          <BellIcon width={28} height={28} />
        </Pressable>
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
  },
  menuIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',

    paddingHorizontal: 4
  }
});
