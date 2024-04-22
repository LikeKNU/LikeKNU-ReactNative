import PageLayout from '@/common/components/PageLayout';
import FontText from '@/common/text/FontText';
import { StyleSheet, View } from 'react-native';

const Announcement = () => {
  return (
    <PageLayout edges={['top']}>
      <View style={styles.header}>
        <FontText fontWeight="700" style={styles.title}>공지사항</FontText>
      </View>
    </PageLayout>
  );
};

export default Announcement;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 10,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24
  }
});
