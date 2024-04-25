import PageLayout from '@/common/components/PageLayout';
import SearchHeader from '@/common/components/SearchHeader';
import FontText from '@/common/text/FontText';
import { FlatList, Keyboard, StyleSheet } from 'react-native';

const AnnouncementSearch = () => {
  return (
    <PageLayout edges={['top']}>
      <SearchHeader />
      <FlatList
        contentContainerStyle={styles.content}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
        renderItem={({ item }) => <FontText style={{ paddingVertical: 20 }}>{item}</FontText>}
        onTouchStart={Keyboard.dismiss}
      />
    </PageLayout>
  );
};

export default AnnouncementSearch;

const styles = StyleSheet.create({
  content: {}
});
