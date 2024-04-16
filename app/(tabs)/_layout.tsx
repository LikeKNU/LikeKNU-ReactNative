import HomeIcon from '@/assets/icons/home.svg'
import { Tabs } from 'expo-router';
import React from 'react';

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        headerShown: false,
        tabBarIcon: ({ color }) => <HomeIcon fill={color} />
      }} />
    </Tabs>
  );
};

export default TabLayout;
