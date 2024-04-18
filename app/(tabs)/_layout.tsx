import HomeIcon from '@/assets/icons/home.svg'
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

const TabLayout = () => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: colors[theme].container,

      borderTopWidth: 0.5,
      borderLeftWidth: 0.5,
      borderRightWidth: 0.5,
      borderLeftColor: colors[theme][theme === 'light' ? 'lightGray' : 'darkGray'],
      borderRightColor: colors[theme][theme === 'light' ? 'lightGray' : 'darkGray'],
      borderTopColor: colors[theme][theme === 'light' ? 'lightGray' : 'darkGray'],
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
    }
  });

  return (
    <Tabs screenOptions={{
      tabBarStyle: styles.tabBar,
      headerShown: false,
      tabBarIconStyle: { marginBottom: -10 },
      tabBarInactiveBackgroundColor: 'none'
    }}>
      <Tabs.Screen name="index" options={{
        tabBarIcon: ({ color }) => <HomeIcon fill={color} width={32} height={32} />,
        tabBarLabel: ({ color }) => <FontText fontWeight="700" style={{ color: color }}>홈</FontText>
      }} />
    </Tabs>
  );
};

export default TabLayout;

