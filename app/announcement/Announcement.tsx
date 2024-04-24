import { useAnnouncements } from '@/api/announcement';
import AnnouncementItem from '@/app/announcement/components/AnnouncementItem';
import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import FontText from '@/common/text/FontText';
import { Categories } from '@/constants/announcement';
import { FlatList, StyleSheet } from 'react-native';

const Announcement = () => {
  const { data, isLoading, error } = useAnnouncements(Categories.STUDENT_NEWS);
  console.table(data);

  return (
    <PageLayout edges={['top']}>
      <TabHeader>
        <FontText fontWeight="700" style={styles.title}>공지사항</FontText>
      </TabHeader>
      <FlatList
        contentContainerStyle={styles.contents}
        data={data}
        renderItem={({ item }) => <AnnouncementItem
          body={item.announcementTitle}
          date={item.announcementDate}
          subtitle={item.announcementTag}
          url={item.announcementUrl}
        />}
        keyExtractor={(item) => item.announcementId}
      />
    </PageLayout>
  );
};

export default Announcement;

const styles = StyleSheet.create({
  title: {
    fontSize: 22
  },
  contents: {
    paddingHorizontal: 8
  }
});
