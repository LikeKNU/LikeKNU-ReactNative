import HomeAnnouncement from '@/app/home/components/HomeAnnouncement';
import HomeBus from '@/app/home/components/HomeBus';
import HomeCalendar from '@/app/home/components/HomeCalendar';
import HomeCampusMap from '@/app/home/components/HomeCampusMap';
import HomeHeader from '@/app/home/components/HomeHeader';
import HomeMeal from '@/app/home/components/HomeMeal';
import HomeOpenChat from '@/app/home/components/HomeOpenChat';
import HomeUnivClub from '@/app/home/components/HomeUnivClub';
import HomeWiki from '@/app/home/components/HomeWiki';
import HomeBannerAd from '@/common/ads/HomeBannerAd';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import { API_URL } from '@/utils/http';
import * as Application from 'expo-application';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { Alert, Linking, Platform, ScrollView, StyleSheet, View } from 'react-native';

const Home = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const notificationResponseListener = useRef<Notifications.EventSubscription>();

  const checkAppVersion = async () => {
    const response = await fetch(`${API_URL}/api/versions`);
    const version = await response.text();
    const currentVersion = Application.nativeApplicationVersion;

    const [newMajor, newMinor] = version.split('.').map(Number);
    const [currentMajor, currentMinor] = currentVersion!.split('.').map(Number);

    if (version && currentVersion && (newMajor > currentMajor || newMinor > currentMinor)) {
      Alert.alert(
        '업데이트 ⬆️',
        '앱을 새로운 버전으로 업데이트 해주세요!',
        [
          {
            text: '나중에',
            style: 'destructive'
          },
          {
            text: '업데이트',
            onPress: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('https://apps.apple.com/kr/app/id6499512208');
              } else {
                Linking.openURL('https://play.google.com/store/apps/details?id=ac.knu.likeknu&hl=ko');
              }
            }
          }
        ]
      );
    }
  };

  useEffect(() => {
    checkAppVersion().then(() => {
    });

    notificationResponseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      router.replace({
        pathname: '/taxi-mate',
        params: { partyId: response.notification.request.content.data.partyId }
      });
    });

    return () => {
      notificationResponseListener.current && Notifications.removeNotificationSubscription(notificationResponseListener.current);
    };
  }, []);

  return (
    <PageLayout edges={['top']} style={{ backgroundColor: colors[theme].background }}>
      <HomeHeader />
      <HomeBannerAd />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <HomeOpenChat />
          <HomeWiki />
          <HomeUnivClub />
          <HomeCampusMap />
        </View>
        <HomeAnnouncement />
        <HomeBus />
        <View style={{ flexDirection: 'row', marginTop: 10, gap: 10 }}>
          <HomeMeal />
          <HomeCalendar />
        </View>
      </ScrollView>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
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
