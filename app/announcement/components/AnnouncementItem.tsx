import DotIcon from '@/assets/icons/dot.svg';
import AnimatedPressable from '@/common/components/AnimatedPressable';
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { getCurrentDate } from '@/utils/date';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export interface ListItemProps {
  subtitle: string;
  date: string;
  body: string;
  url: string | null;
}

const AnnouncementItem = ({ subtitle, date, body, url }: ListItemProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const isToday = date === getCurrentDate();

  const handlePress = () => {
    router.push({
      pathname: '/announcement/details',
      params: { url: url }
    });
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={[styles.container, { borderBottomColor: colors[theme].gray300 }]}
      animatedViewStyle={{ borderRadius: 12, paddingHorizontal: 20 }}
    >
      <FontText fontWeight="500" style={[{ color: colors[theme].contrast }, styles.body]}>{body}</FontText>
      <View style={styles.additionalContainer}>
        <FontText style={[{ color: colors[theme].gray100 }, styles.additional]}>{subtitle + ' | ' + date}</FontText>
        {isToday && <DotIcon fill={colors.red} width={12} height={12} />}
      </View>
    </AnimatedPressable>
  );
};

export default AnnouncementItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderBottomWidth: 0.5
  },
  additional: {
    flexDirection: 'row',
    alignItems: 'center',

    fontSize: 13
  },
  body: {
    fontSize: 15
  },
  additionalContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingTop: 4
  }
});
