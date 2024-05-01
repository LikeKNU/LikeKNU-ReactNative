import { useAnnouncements } from '@/api/announcement';
import SearchIcon from '@/assets/icons/search.svg';
import AnimatedPressable from '@/common/components/AnimatedPressable';
import InfiniteScrollView from '@/common/components/InfiniteScrollView';
import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import TopTabs from '@/common/components/TopTabs';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import { categories } from '@/constants/announcement';
import colors from '@/constants/colors';
import { AnnouncementProps } from '@/types/announcementType';
import { ValueNameType } from '@/types/common';
import { flatMapRemoveDuplicate } from '@/utils/data';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

const Announcement = () => {
  const [category, setCategory] = useState<ValueNameType>(categories.STUDENT_NEWS);
  const {
    data,
    size,
    setSize,
    isLoading,
    error,
    isValidating,
    mutate
  } = useAnnouncements(category.value);
  const { theme } = useTheme();
  const router = useRouter();
  const announcements = flatMapRemoveDuplicate<AnnouncementProps[]>(data);

  const loadMore = () => {
    if (!isValidating && !isLoading) {
      setSize(size + 1);
    }
  };

  const handleChangeCategory = (changeCategory: ValueNameType) => {
    setCategory(changeCategory);
  };

  return (
    <PageLayout edges={['top']}>
      <TabHeader>
        <FontText fontWeight="700" style={styles.title}>공지사항</FontText>
        <AnimatedPressable style={{ padding: 4 }}
                           animatedViewStyle={{ borderRadius: 8, padding: 4}}
                           onPress={() => router.push('/announcement/search')}>
          <SearchIcon width={20} height={20} fill={colors[theme].gray200} />
        </AnimatedPressable>
      </TabHeader>
      <TopTabs
        handleTabPress={handleChangeCategory}
        activeTab={category}
        tabItems={Object.values(categories).map(value => value)}
      />
      <InfiniteScrollView
        data={announcements}
        handleEndReached={loadMore}
        isValidating={isValidating}
        isLoading={isLoading}
        mutate={mutate}
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
