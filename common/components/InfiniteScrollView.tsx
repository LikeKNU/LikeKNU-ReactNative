import AnnouncementItem from '@/app/announcement/components/AnnouncementItem';
import { useTheme } from '@/common/components/ThemeContext';
import colors from '@/constants/colors';
import React, { useRef } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

interface InfiniteScrollViewProps {
  data: any[],
  handleEndReached: () => void,
  isValidating: boolean
}

const InfiniteScrollView = ({ data, handleEndReached, isValidating }: InfiniteScrollViewProps) => {
  const { theme } = useTheme();
  const contentRef = useRef<FlatList>(null);

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
      onEndReached={() => {
        handleEndReached();
        scrollOnTop();
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => isValidating ? <ActivityIndicator color={colors[theme].gray100} /> : null}
    />
  );
};

export default InfiniteScrollView;

const styles = StyleSheet.create({
  contents: {
    paddingHorizontal: 4
  }
});
