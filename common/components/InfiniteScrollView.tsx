import AnnouncementItem from '@/app/announcement/components/AnnouncementItem';
import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import { usePathname } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, FlatList, Keyboard, RefreshControl, StyleSheet, View } from 'react-native';

interface InfiniteScrollViewProps {
  data: any[];
  handleEndReached: () => void;
  isValidating: boolean;
  isLoading: boolean;
  resetDependency?: any;
  mutate?: any;
}

const InfiniteScrollView = ({
                              data,
                              handleEndReached,
                              isValidating,
                              resetDependency,
                              isLoading,
                              mutate
                            }: InfiniteScrollViewProps) => {
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

  const activityIndicator = <View style={{ paddingVertical: 10 }}>
    <ActivityIndicator color={colors[theme].gray100} />
  </View>;

  return (
    <FlatList
      ref={contentRef}
      contentContainerStyle={styles.contents}
      data={data}
      renderItem={({ item }) => <AnnouncementItem announcement={item} />}
      keyExtractor={(item) => item.announcementId}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => isValidating ? activityIndicator : null}
      onTouchStart={Keyboard.dismiss}
      refreshControl={
        <RefreshControl
          tintColor={colors[theme].gray100}
          refreshing={isLoading}
          onRefresh={mutate}
        />
      }
    />
  );
};

export default InfiniteScrollView;

const styles = StyleSheet.create({
  contents: {
    paddingHorizontal: 4
  }
});
