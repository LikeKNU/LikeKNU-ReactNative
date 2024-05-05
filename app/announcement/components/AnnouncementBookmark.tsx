import { useBookmarkAnnouncements } from '@/api/announcement';
import AnnouncementItem from '@/app/announcement/components/AnnouncementItem';
import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { usePathname } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

const AnnouncementBookmark = () => {
  const { theme } = useTheme();
  const {
    data,
    isValidating,
    mutate
  } = useBookmarkAnnouncements();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/announcement/bookmark') {
      mutate();
    }
  }, [pathname]);

  return (
    <PageLayout edges={['top']}>
      <BackHeader title="북마크" />
      {!data || data.length !== 0 || isValidating ?
        <FlatList data={data} renderItem={({ item }) => <AnnouncementItem announcement={item} />} />
        :
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <FontText fontWeight="500" style={[styles.emptyMessage, { color: colors[theme].gray100 }]}>
            북마크한 공지사항이 없어요!
          </FontText>
        </View>
      }
    </PageLayout>
  );
};

export default AnnouncementBookmark;

const styles = StyleSheet.create({
  emptyMessage: { fontSize: 15 }
});
