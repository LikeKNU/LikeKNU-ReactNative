import { useAnnouncementsSearch } from '@/api/announcement';
import InfiniteScrollView from '@/common/components/InfiniteScrollView';
import PageLayout from '@/common/components/PageLayout';
import SearchHeader from '@/common/components/SearchHeader';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

const AnnouncementSearch = () => {
  const [keyword, setKeyword] = useState<string>('');
  const {
    data,
    size,
    setSize,
    isLoading,
    error,
    isValidating
  } = useAnnouncementsSearch(keyword);
  // const announcements = data ? data.flatMap(value => value) : [];
  const announcements = data ? [...new Set(data.flatMap(value => value).map(item => JSON.stringify(item)))].map(json => JSON.parse(json)) : [];

  const loadMore = () => {
    if (!isValidating && !isLoading) {
      setSize(size + 1);
    }
  };

  const handleSubmit = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <PageLayout edges={['top']}>
      <SearchHeader handleSubmit={handleSubmit} />
      <InfiniteScrollView
        data={announcements}
        handleEndReached={loadMore}
        isValidating={isValidating}
      />
    </PageLayout>
  );
};

export default AnnouncementSearch;

const styles = StyleSheet.create({
  content: {}
});
