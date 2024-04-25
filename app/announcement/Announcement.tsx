import { useAnnouncements } from '@/api/announcement';
import AnnouncementItem from '@/app/announcement/components/AnnouncementItem';
import SearchIcon from '@/assets/icons/search.svg';
import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import { Categories } from '@/constants/announcement';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, StyleSheet } from 'react-native';

const Announcement = () => {
  const { data, size, setSize, isLoading, error, isValidating } =
    useAnnouncements(Categories.INTERNSHIP);
  const { theme } = useTheme();
  const router = useRouter();
  const announcements = data ? data.flatMap(value => value) : [];

  const loadMore = () => {
    if (!isValidating && !isLoading) {
      setSize(size + 1);
    }
  };

  return (
    <PageLayout edges={['top']}>
      <TabHeader>
        <FontText fontWeight="700" style={styles.title}>공지사항</FontText>
        <Pressable style={{ marginRight: 4 }} onPress={() => router.push('/announcement/search')}>
          <SearchIcon width={22} height={22} fill={colors[theme].gray100} />
        </Pressable>
      </TabHeader>
      <FlatList
        contentContainerStyle={styles.contents}
        data={announcements}
        renderItem={({ item }) => <AnnouncementItem
          body={item.announcementTitle}
          date={item.announcementDate}
          subtitle={item.announcementTag}
          url={item.announcementUrl}
        />}
        keyExtractor={(item) => item.announcementId}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => isValidating ? <ActivityIndicator color={colors[theme].gray100} /> : null}
      />
    </PageLayout>
  );
};

export default Announcement;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 22
  },
  contents: {
    paddingHorizontal: 4
  }
});
