import { useBookmarkAnnouncements } from '@/api/announcement';
import BackHeader from '@/common/components/BackHeader';
import InfiniteScrollView from '@/common/components/InfiniteScrollView';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { AnnouncementProps } from '@/types/announcementType';
import { flatMapRemoveDuplicate } from '@/utils/data';
import { StyleSheet, View } from 'react-native';

const AnnouncementSearch = () => {
  const { theme } = useTheme();
  const {
    data,
    size,
    setSize,
    isLoading,
    isValidating,
    mutate
  } = useBookmarkAnnouncements();
  const announcements = flatMapRemoveDuplicate<AnnouncementProps[]>(data);

  const loadMore = () => {
    if (!isValidating && !isLoading) {
      setSize(size + 1);
    }
  };

  return (
    <PageLayout edges={['top']}>
      <BackHeader title="북마크" />
      {announcements.length !== 0 || isValidating ?
        <InfiniteScrollView
          data={announcements}
          handleEndReached={loadMore}
          isValidating={isValidating}
          isLoading={isLoading}
          mutate={mutate}
        /> :
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <FontText fontWeight="500" style={[styles.emptyMessage, { color: colors[theme].gray100 }]}>
            북마크한 공지사항이 없어요!
          </FontText>
        </View>
      }
    </PageLayout>
  );
};

export default AnnouncementSearch;

const styles = StyleSheet.create({
  emptyMessage: { fontSize: 15 }
});
