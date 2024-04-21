import { useHomeAnnouncements } from '@/api/home';
import CardContainer from '@/common/components/CardContainer';
import FontText from '@/common/text/FontText';
import { HomeAnnouncementProps } from '@/types/homeType';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

const HomeAnnouncement = () => {
  const { data, isLoading, error } = useHomeAnnouncements();
  const router = useRouter();

  const renderItem = ({ item }: { item: HomeAnnouncementProps }) => (
    <Pressable onPress={() => router.push({
      pathname: '/announcement/details',
      params: { url: item.announcementUrl }
    })}>
      <FontText
        fontWeight="400"
        style={styles.content}
        numberOfLines={1}
      >
        {item.announcementTitle}
      </FontText>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.navigate('/announcement')}>
        <CardContainer title="공지사항">
          <FlatList
            scrollEnabled={false}
            data={data}
            renderItem={renderItem}
          />
        </CardContainer>
      </Pressable>
    </View>
  );
};

export default HomeAnnouncement;

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  content: {
    fontSize: 13,
    marginBottom: 4
  }
});
