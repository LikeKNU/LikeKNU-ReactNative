import HomeIcon from '@/assets/icons/home.svg'
import { useTheme } from '@/common/components/ThemeContext';
import colors from '@/constants/colors';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

const TabLayout = () => {
  const { theme } = useTheme();

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        headerShown: false,
        tabBarStyle: [styles.tabBar, { backgroundColor: colors[theme].container }],
        tabBarIcon: ({ color }) => <HomeIcon fill={color} />
      }} />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  }
});
