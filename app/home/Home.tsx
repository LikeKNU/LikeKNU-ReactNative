'use client';

import { useSchedules } from '@/api/test';
import CardContainer from '@/common/components/CardContainer';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/components/ThemeContext';
import colors from '@/constants/colors';
import React from 'react';
import { StyleSheet } from 'react-native';

const Home = () => {
  const { theme } = useTheme();
  const { data: schedules } = useSchedules();

  return (
    <PageLayout edges={['top']} style={{ backgroundColor: colors[theme].background }}>
      <CardContainer title="안뇽" />
    </PageLayout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 32,
    textAlign: 'center'
  }
});
