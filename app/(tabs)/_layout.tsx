import AssignmentIcon from '@/assets/icons/assignment.svg'
import BusFrontIcon from '@/assets/icons/bus-front.svg'
import HomeIcon from '@/assets/icons/home.svg'
import RestaurantIcon from '@/assets/icons/restaurant.svg'
import ThreeDotsIcon from '@/assets/icons/three-dots.svg'
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import * as Haptics from 'expo-haptics';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

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
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25
    }
  });

  return (
    <Tabs screenOptions={{
      tabBarStyle: styles.tabBar,
      headerShown: false,
      tabBarIconStyle: { marginBottom: -8 },
      tabBarActiveTintColor: colors[theme].text,
      tabBarInactiveTintColor: colors[theme].gray200
    }}>
      <Tabs.Screen name="index" options={{
        tabBarIcon: ({ color }) => (
          <View onTouchStart={() => Haptics.selectionAsync()}>
            <HomeIcon fill={color} width={30} height={30} />
          </View>
        ),
        tabBarLabel: ({ color }) => (
          <View onTouchStart={() => Haptics.selectionAsync()}>
            <FontText fontWeight="500" style={{ color: color, fontSize: 11, marginBottom: 2 }}>홈</FontText>
          </View>
        )
      }} />
      <Tabs.Screen name="announcement" options={{
        tabBarIcon: ({ color }) => (
          <View onTouchStart={() => Haptics.selectionAsync()}>
            <AssignmentIcon fill={color} width={26} height={26} />
          </View>
        ),
        tabBarLabel: ({ color }) => (
          <View onTouchStart={() => Haptics.selectionAsync()}>
            <FontText fontWeight="500" style={{ color: color, fontSize: 11, marginBottom: 2 }}>공지사항</FontText>
          </View>
        )
      }} />
      <Tabs.Screen name="bus" options={{
        tabBarIcon: ({ color }) => (
          <View onTouchStart={() => Haptics.selectionAsync()}>
            <BusFrontIcon fill={color} width={26} height={26} />
          </View>
        ),
        tabBarLabel: ({ color }) => (
          <View onTouchStart={() => Haptics.selectionAsync()}>
            <FontText fontWeight="500" style={{ color: color, fontSize: 11, marginBottom: 2 }}>버스</FontText>
          </View>
        )
      }} />
      <Tabs.Screen name="meal" options={{
        tabBarIcon: ({ color }) => (
          <View onTouchStart={() => Haptics.selectionAsync()}>
            <RestaurantIcon fill={color} width={26} height={26} />
          </View>
        ),
        tabBarLabel: ({ color }) => (
          <View onTouchStart={() => Haptics.selectionAsync()}>
            <FontText fontWeight="500" style={{ color: color, fontSize: 11, marginBottom: 2 }}>식단</FontText>
          </View>
        )
      }} />
      <Tabs.Screen name="more" options={{
        tabBarIcon: ({ color }) => (
          <View onTouchStart={() => Haptics.selectionAsync()}>
            <ThreeDotsIcon fill={color} width={26} height={26} />
          </View>
        ),
        tabBarLabel: ({ color }) => (
          <View onTouchStart={() => Haptics.selectionAsync()}>
            <FontText fontWeight="500" style={{ color: color, fontSize: 11, marginBottom: 2 }}>더보기</FontText>
          </View>
        )
      }} />
    </Tabs>
  );
};

export default TabLayout;
