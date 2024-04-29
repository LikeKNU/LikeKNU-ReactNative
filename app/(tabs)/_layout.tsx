import AssignmentIcon from '@/assets/icons/assignment.svg'
import BusFrontIcon from '@/assets/icons/bus-front.svg'
import HomeIcon from '@/assets/icons/home.svg'
import RestaurantIcon from '@/assets/icons/restaurant.svg'
import ThreeDotsIcon from '@/assets/icons/three-dots.svg'
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import * as Haptics from 'expo-haptics';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

const TabLayout = () => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: colors[theme].container,

      borderTopWidth: 0.5,
      borderLeftWidth: 0.5,
      borderRightWidth: 0.5,
      borderLeftColor: colors[theme].gray300,
      borderRightColor: colors[theme].gray300,
      borderTopColor: colors[theme].gray300,
      borderTopRightRadius: Platform.OS !== 'web' ? 25 : 0,
      borderTopLeftRadius: Platform.OS !== 'web' ? 25 : 0,

      paddingHorizontal: 10
    }
  });

  return (
    <Tabs
      screenListeners={{ tabPress: Platform.OS !== 'web' ? () => Haptics.selectionAsync() : undefined }}
      screenOptions={{
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarIconStyle: { marginBottom: -8 },
        tabBarActiveTintColor: colors[theme].contrast,
        tabBarInactiveTintColor: colors[theme].gray200
      }}>
      <Tabs.Screen name="index" options={{
        tabBarIcon: ({ color }) => (
          <HomeIcon fill={color} width={30} height={30} />
        ),
        tabBarLabel: ({ color }) => (
          <FontText fontWeight="500" style={{ color: color, fontSize: 11, marginBottom: 2 }}>홈</FontText>
        )
      }} />
      <Tabs.Screen name="announcement" options={{
        tabBarIcon: ({ color }) => (
          <AssignmentIcon fill={color} width={26} height={26} />
        ),
        tabBarLabel: ({ color }) => (
          <FontText fontWeight="500" style={{ color: color, fontSize: 11, marginBottom: 2 }}>공지사항</FontText>
        )
      }} />
      <Tabs.Screen name="bus" options={{
        tabBarIcon: ({ color }) => (
          <BusFrontIcon fill={color} width={26} height={26} />
        ),
        tabBarLabel: ({ color }) => (
          <FontText fontWeight="500" style={{ color: color, fontSize: 11, marginBottom: 2 }}>버스</FontText>
        )
      }} />
      <Tabs.Screen name="meal" options={{
        tabBarIcon: ({ color }) => (
          <RestaurantIcon fill={color} width={26} height={26} />
        ),
        tabBarLabel: ({ color }) => (
          <FontText fontWeight="500" style={{ color: color, fontSize: 11, marginBottom: 2 }}>식단</FontText>
        )
      }} />
      <Tabs.Screen name="more" options={{
        tabBarIcon: ({ color }) => (
          <ThreeDotsIcon fill={color} width={26} height={26} />
        ),
        tabBarLabel: ({ color }) => (
          <FontText fontWeight="500" style={{ color: color, fontSize: 11, marginBottom: 2 }}>더보기</FontText>
        )
      }} />
    </Tabs>
  );
};

export default TabLayout;
