import BookmarkItem from '@/app/announcement/components/BookmarkItem';
import DotIcon from '@/assets/icons/dot.svg';
import AnimatedPressable from '@/common/components/AnimatedPressable';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { AnnouncementProps } from '@/types/announcementType';
import { getCurrentDate } from '@/utils/date';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const AnnouncementItem = ({ announcement }: { announcement: AnnouncementProps }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const isToday = announcement.announcementDate === getCurrentDate();

  const handlePress = () => {
    router.push({
      pathname: '/announcement/details',
      params: {
        url: announcement.announcementUrl,
        id: announcement.announcementId,
        isBookmark: announcement.isBookmarked
      }
    });
  };

  const handleChangeBookmark = (isBookmark: boolean) => {
    announcement.isBookmarked = isBookmark;
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={[styles.container, { borderBottomColor: colors[theme].gray300 }]}
      animatedViewStyle={{ borderRadius: 12, paddingHorizontal: 20 }}
    >
      <View style={{ flex: 8 }}>
        <FontText fontWeight="500" style={[{ color: colors[theme].contrast }, styles.body]}>
          {announcement.announcementTitle}
        </FontText>
        <View style={styles.additionalContainer}>
          <FontText style={[{ color: colors[theme].gray100 }, styles.additional]}>
            {announcement.announcementTag + ' | ' + announcement.announcementDate}
          </FontText>
          {isToday && <DotIcon fill={colors.red} width={14} height={14} />}
        </View>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <BookmarkItem
          announcementId={announcement.announcementId}
          isBookmarked={announcement.isBookmarked}
          handleChange={handleChangeBookmark}
        />
      </View>
    </AnimatedPressable>
  );
};

export default AnnouncementItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
