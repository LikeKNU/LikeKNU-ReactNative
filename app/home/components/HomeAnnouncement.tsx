import { useHomeAnnouncements } from '@/api/home';
import CardContainer from '@/common/components/CardContainer';
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

const HomeAnnouncement = () => {
  const { data, isLoading, error } = useHomeAnnouncements();
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.navigate('/announcement')}>
        <CardContainer title="공지사항" style={styles.cardContainer}>
          <FlatList
            scrollEnabled={false}
            data={data}
            renderItem={
              ({ item }) =>
                <Pressable onPress={() => router.push({
                  pathname: '/announcement/details',
                  params: { url: item.announcementUrl }
                })}>
                  <FontText
                    fontWeight="300"
                    style={[styles.body, { color: colors[theme].text }]}
                    numberOfLines={1}
                  >
                    {item.announcementTitle}
                  </FontText>
                </Pressable>
            }
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
  cardContainer: {},
  body: {
    fontSize: 13,
    marginBottom: 4
  }
});
