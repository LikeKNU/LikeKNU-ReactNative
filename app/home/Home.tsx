'use client';

import HomeAnnouncement from '@/app/home/components/HomeAnnouncement';
import HomeHeader from '@/app/home/components/HomeHeader';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/components/ThemeContext';
import colors from '@/constants/colors';
import React from 'react';
import { ScrollView } from 'react-native';

const Home = () => {
  const { theme } = useTheme();

  return (
    <PageLayout edges={['top']} style={{ backgroundColor: colors[theme].background }}>
      <HomeHeader />
      <ScrollView
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <HomeAnnouncement />
        <HomeAnnouncement />
        <HomeAnnouncement />
        <HomeAnnouncement />
      </ScrollView>
    </PageLayout>
  );
};

export default Home;
