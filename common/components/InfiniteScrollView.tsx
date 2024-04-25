import AnnouncementItem from '@/app/announcement/components/AnnouncementItem';
import { useTheme } from '@/common/components/ThemeContext';
import colors from '@/constants/colors';
import { Category } from '@/types/announcementType';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, FlatList, Keyboard, StyleSheet } from 'react-native';

interface InfiniteScrollViewProps {
  data: any[],
  handleEndReached: () => void,
  isValidating: boolean,
  resetDependency?: Category
}

const InfiniteScrollView = ({ data, handleEndReached, isValidating, resetDependency }: InfiniteScrollViewProps) => {
  const { theme } = useTheme();
  const contentRef = useRef<FlatList>(null);

  useEffect(() => {
    scrollOnTop();
  }, [resetDependency]);

  const scrollOnTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  return (
    <FlatList
      ref={contentRef}
      contentContainerStyle={styles.contents}
      data={data}
      renderItem={({ item }) => <AnnouncementItem
        body={item.announcementTitle}
        date={item.announcementDate}
        subtitle={item.announcementTag}
        url={item.announcementUrl}
      />}
      keyExtractor={(item) => item.announcementId}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => isValidating ? <ActivityIndicator color={colors[theme].gray100} /> : null}
      onTouchStart={Keyboard.dismiss}
    />
  );
};

export default InfiniteScrollView;

const styles = StyleSheet.create({
  contents: {
    paddingHorizontal: 4
  }
});
