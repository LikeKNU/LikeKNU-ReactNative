'use client';

import HomeAnnouncement from '@/app/home/components/HomeAnnouncement';
import HomeBus from '@/app/home/components/HomeBus';
import HomeHeader from '@/app/home/components/HomeHeader';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/components/ThemeContext';
import colors from '@/constants/colors';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

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
      </ScrollView>
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
