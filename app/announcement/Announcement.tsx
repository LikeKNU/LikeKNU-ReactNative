import { useAnnouncements } from '@/api/announcement';
import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import FontText from '@/common/text/FontText';
import { Categories } from '@/constants/announcement';
import { StyleSheet } from 'react-native';

const Announcement = () => {
  const { data, isLoading, error } = useAnnouncements(Categories.STUDENT_NEWS);

  return (
    <PageLayout edges={['top']}>
      <TabHeader>
        <FontText fontWeight="700" style={styles.title}>공지사항</FontText>
      </TabHeader>
    </PageLayout>
  );
};

export default Announcement;

const styles = StyleSheet.create({
  title: {
    fontSize: 24
  }
});
