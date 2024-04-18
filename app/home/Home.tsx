'use client';

import HomeHeader from '@/app/home/components/HomeHeader';
import CardContainer from '@/common/components/CardContainer';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/components/ThemeContext';
import colors from '@/constants/colors';
import React from 'react';
import { ScrollView, View } from 'react-native';

const Home = () => {
  const { theme } = useTheme();

  return (
    <PageLayout edges={['top']} style={{ backgroundColor: colors[theme].background }}>
      <HomeHeader />
      <ScrollView
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 10 }}>
          <CardContainer title="하이" style={{ height: 200 }} />
        </View>
        <View style={{ marginTop: 10 }}>
          <CardContainer title="하이" style={{ height: 200 }} />
        </View>
        <View style={{ marginTop: 10 }}>
          <CardContainer title="하이" style={{ height: 200 }} />
        </View>
        <View style={{ marginTop: 10 }}>
          <CardContainer title="하이" style={{ height: 200 }} />
        </View>
      </ScrollView>
    </PageLayout>
  );
};

export default Home;
