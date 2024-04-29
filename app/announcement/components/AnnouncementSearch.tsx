import { useAnnouncementsSearch } from '@/api/announcement';
import InfiniteScrollView from '@/common/components/InfiniteScrollView';
import PageLayout from '@/common/components/PageLayout';
import SearchHeader from '@/common/components/SearchHeader';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { AnnouncementProps } from '@/types/announcementType';
import { flatMapRemoveDuplicate } from '@/utils/data';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

const AnnouncementSearch = () => {
  const { theme } = useTheme();
  const [keyword, setKeyword] = useState<string>('');
  const {
    data,
    size,
    setSize,
    isLoading,
    error,
    isValidating,
    mutate
  } = useAnnouncementsSearch(keyword);
  const announcements = flatMapRemoveDuplicate<AnnouncementProps[]>(data);

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
      {announcements.length !== 0 || isValidating ?
        <InfiniteScrollView
          data={announcements}
          handleEndReached={loadMore}
          isValidating={isValidating}
          isLoading={isLoading}
          mutate={mutate}
        /> :
        <KeyboardAvoidingView
          onTouchStart={Keyboard.dismiss}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <FontText fontWeight="500" style={[styles.emptyMessage, { color: colors[theme].gray100 }]}>
            검색 결과가 없어요
          </FontText>
        </KeyboardAvoidingView>
      }
    </PageLayout>
  );
};

export default AnnouncementSearch;

const styles = StyleSheet.create({
  emptyMessage: { fontSize: 15 }
});
