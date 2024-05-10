import HomeAnnouncement from '@/app/home/components/HomeAnnouncement';
import HomeBus from '@/app/home/components/HomeBus';
import HomeCalendar from '@/app/home/components/HomeCalendar';
import HomeHeader from '@/app/home/components/HomeHeader';
import HomeMeal from '@/app/home/components/HomeMeal';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const Home = () => {
  const { theme } = useTheme();

  return (
    <PageLayout edges={['top']} style={{ backgroundColor: colors[theme].background }}>
      <HomeHeader />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <HomeAnnouncement />
        <HomeBus />
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <HomeMeal />
          <HomeCalendar />
        </View>
      </ScrollView>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
    </PageLayout>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 10,
    paddingHorizontal: 20
  }
});
