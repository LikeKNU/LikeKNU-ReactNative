import BellIcon from '@/assets/icons/bell.svg';
import GrayIconDark from '@/assets/icons/gray-icon-dark.svg'
import GrayIconLight from '@/assets/icons/gray-icon-light.svg'
import TabHeader from '@/common/components/TabHeader';
import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import { campusName } from '@/constants/campus';
import { campusColors } from '@/constants/colors';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

const HomeHeader = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { campus } = useCampus();

  const handleNotificationPress = () => {
    if (Platform.OS === 'ios') {
      Haptics.selectionAsync();
    }
    router.push('/notification');
  };

  return (
    <TabHeader>
      <Pressable style={styles.title} onPress={() => router.navigate('/more')}>
        {theme === 'light' ? <GrayIconLight width={34} height={34} /> : <GrayIconDark width={34} height={34} />}
        {campus && <FontText fontWeight="700" style={[styles.campus, { color: campusColors[campus] }]}>
          {campusName[campus].name}
        </FontText>}
      </Pressable>
      <View style={styles.menuIcons}>
        <Pressable onPress={handleNotificationPress}>
          <BellIcon width={28} height={28} />
        </Pressable>
      </View>
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
