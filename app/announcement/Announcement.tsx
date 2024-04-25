import { useAnnouncements } from '@/api/announcement';
import SearchIcon from '@/assets/icons/search.svg';
import InfiniteScrollView from '@/common/components/InfiniteScrollView';
import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import { useTheme } from '@/common/components/ThemeContext';
import TopTabs from '@/common/components/TopTabs';
import FontText from '@/common/text/FontText';
import { categories } from '@/constants/announcement';
import colors from '@/constants/colors';
import { AnnouncementProps, Category } from '@/types/announcementType';
import { flatMapRemoveDuplicate } from '@/utils/data';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

const Announcement = () => {
  const [category, setCategory] = useState<Category>(categories.STUDENT_NEWS);
  const {
    data,
    size,
    setSize,
    isLoading,
    error,
    isValidating
  } = useAnnouncements(category.value);
  const { theme } = useTheme();
  const router = useRouter();
  const announcements = flatMapRemoveDuplicate<AnnouncementProps[]>(data);

  const loadMore = () => {
    if (!isValidating && !isLoading) {
      setSize(size + 1);
    }
  };

  const handleChangeCategory = (changeCategory: Category) => {
    setCategory(changeCategory);
  };

  return (
    <PageLayout edges={['top']}>
      <TabHeader>
        <FontText fontWeight="700" style={styles.title}>공지사항</FontText>
        <Pressable style={{ marginRight: 6 }} onPress={() => router.push('/announcement/search')}>
          <SearchIcon width={20} height={20} fill={colors[theme].gray200} />
        </Pressable>
      </TabHeader>
      <TopTabs<Category>
        handleTabPress={handleChangeCategory}
        activeTab={category}
        tabItems={Object.values(categories).map(value => value)}
      />
      <InfiniteScrollView
        data={announcements}
        handleEndReached={loadMore}
        isValidating={isValidating}
        resetDependency={category}
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
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    borderBottomWidth: 0.3
  }
});
