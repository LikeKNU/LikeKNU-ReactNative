import { useHomeMessage } from '@/api/home';
import GrayIconDark from '@/assets/icons/gray-icon-dark.svg'
import GrayIconLight from '@/assets/icons/gray-icon-light.svg'
import TabHeader from '@/common/components/TabHeader';
import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import { campusName } from '@/constants/campus';
import colors, { campusColors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

const HomeHeader = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { campus } = useCampus();
  const { data: message } = useHomeMessage();

  return (
    <TabHeader>
      <Pressable style={styles.title} onPress={() => router.navigate('/more')}>
        {theme === 'light' ? <GrayIconLight width={34} height={34} /> : <GrayIconDark width={34} height={34} />}
        {campus && <FontText fontWeight="700" style={[styles.campus, { color: campusColors[campus] }]}>
          {campusName[campus].name}
        </FontText>}
      </Pressable>
      <Pressable style={{ paddingHorizontal: 4, paddingVertical: 4 }}>
        <FontText fontWeight="500" style={{ color: colors[theme].gray100 }}>{message}</FontText>
      </Pressable>
    </TabHeader>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  campus: {
    fontSize: 24,
    marginLeft: -2
  },
  menuIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',

    paddingHorizontal: 4
  }
});
