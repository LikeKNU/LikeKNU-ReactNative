import { useHomeCalendar } from '@/api/home';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import CardContainer from '@/common/components/CardContainer';
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

const HomeCalendar = () => {
  const { data, isLoading, error } = useHomeCalendar();
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={{ flex: 1, marginLeft: 5 }}>
      <CardContainer
        title={
          <Pressable style={styles.titleContainer} onPress={() => router.push('/calendar')}>
            <FontText fontWeight="700" style={styles.title}>학사일정</FontText>
            <ArrowRightIcon />
          </Pressable>
        }
        style={{ height: 232 }}
      >
        <FlatList
          scrollEnabled={false}
          data={data}
          renderItem={
            ({ item }) => (
              <View style={styles.container}>
                <FontText fontWeight="500" style={[styles.date, { color: colors[theme].gray100 }]}>
                  {item.scheduleDate}
                </FontText>
                <FontText fontWeight="500" style={[styles.contents]}>{item.scheduleContents}</FontText>
              </View>
            )}
        />
      </CardContainer>
    </View>
  );
};

export default HomeCalendar;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 18
  },
  container: {
    marginBottom: 10
  },
  date: {
    fontSize: 11
  },
  contents: {
    fontSize: 12
  }
});
