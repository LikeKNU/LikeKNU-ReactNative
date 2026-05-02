import { useAdAnnouncements, useAnnouncements } from '@/api/announcement';
import SearchIcon from '@/assets/icons/search.svg';
import ThreeDotsIcon from '@/assets/icons/three-dots-vertical.svg';
import AnnouncementBannerAd from '@/common/ads/AnnouncementBannerAd';
import AnimatedPressable from '@/common/components/AnimatedPressable';
import InfiniteScrollView from '@/common/components/InfiniteScrollView';
import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import TabTitle from '@/common/components/TabTitle';
import TopTabs from '@/common/components/TopTabs';
import { useTheme } from '@/common/contexts/ThemeContext';
import { categories } from '@/constants/announcement';
import colors from '@/constants/colors';
import { AnnouncementProps } from '@/types/announcementType';
import { ValueNameType } from '@/types/common';
import { flatMapRemoveDuplicate } from '@/utils/data';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const Announcement = () => {
  const [category, setCategory] = useState<ValueNameType>(categories.STUDENT_NEWS);
  const {
    data: announcementsResponse,
    size,
    setSize,
    isLoading,
    isValidating,
    mutate
  } = useAnnouncements(category.value);
  const {
    data: adAnnouncementsResponse,
    isLoading: isAdLoading,
    isValidating: isAdValidating,
    mutate: adMutate
  } = useAdAnnouncements();
  const { theme } = useTheme();
  const router = useRouter();
  const { showActionSheetWithOptions } = useActionSheet();
  const announcements = flatMapRemoveDuplicate<AnnouncementProps[]>(announcementsResponse);
  const adAnnouncements = adAnnouncementsResponse ?? [];
  const pathname = usePathname();

  const openMoreMenu = () => {
    const options = ['키워드 알림', '북마크', '닫기'];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        cancelButtonTintColor: colors[theme].red
      },
      (selectedIndex) => {
        if (selectedIndex === 0) router.push('/keyword');
        if (selectedIndex === 1) router.push('/announcement/bookmark');
      }
    );
  };

  const combinedAnnouncements = useMemo(() => {
    return [...adAnnouncements, ...announcements];
  }, [adAnnouncements, announcements]);

  useEffect(() => {
    if (pathname === '/announcement') {
      mutate();
    }
  }, [pathname]);

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
        <TabTitle title="공지사항" />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AnimatedPressable style={styles.searchPressable}
                             animatedViewStyle={styles.searchAnimatedPressable}
                             onPress={() => router.push('/announcement/search')}>
            <SearchIcon width={22} height={22} fill={colors[theme].gray200} />
          </AnimatedPressable>
          <AnimatedPressable style={styles.morePressable}
                             animatedViewStyle={styles.moreAnimatedPressable}
                             onPress={openMoreMenu}>
            <ThreeDotsIcon width={22} height={22} fill={colors[theme].gray200} />
          </AnimatedPressable>
        </View>
      </TabHeader>
      <TopTabs
        handleTabPress={handleChangeCategory}
        activeTab={category}
        tabItems={Object.values(categories).map(value => value)}
      />
      <AnnouncementBannerAd />
      <InfiniteScrollView
        data={combinedAnnouncements}
        handleEndReached={loadMore}
        isValidating={isValidating || isAdValidating}
        isLoading={isLoading || isAdLoading}
        mutate={mutate}
        adMutate={adMutate}
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
  searchPressable: {
    padding: 4
  },
  morePressable: {
    padding: 4
  },
  searchAnimatedPressable: {
    borderRadius: 8,
    padding: 4,
    marginRight: 2
  },
  moreAnimatedPressable: {
    borderRadius: 8,
    padding: 4,
    marginLeft: 2
  }
});
