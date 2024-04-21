import { useHomeBuses } from '@/api/home';
import CardContainer from '@/common/components/CardContainer';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const HomeCalendar = () => {
  const { data, isLoading, error, mutate } = useHomeBuses();
  const router = useRouter();

  return (
    <View style={{ flex: 1, marginLeft: 5 }}>
      <CardContainer title="학사일정">

      </CardContainer>
    </View>
  );
};

export default HomeCalendar;
