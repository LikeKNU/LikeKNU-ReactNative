import HomeAnnouncement from '@/app/home/components/HomeAnnouncement';
import HomeBus from '@/app/home/components/HomeBus';
import HomeCalendar from '@/app/home/components/HomeCalendar';
import HomeHeader from '@/app/home/components/HomeHeader';
import HomeMeal from '@/app/home/components/HomeMeal';
import HomeNewFeature from '@/app/home/components/HomeNewFeature';
import HomeBannerAd from '@/common/ads/HomeBannerAd';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import { getData, storeData } from '@/utils/storage';
import * as Application from 'expo-application';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const Home = () => {
  const { theme } = useTheme();
  const [showNewFeature, setShowNewFeature] = useState<boolean>(true);

  const getMajorMinorVersion = (version: string): string => {
    console.log(version);
    const parts = version.split('.');
    return parts.slice(0, 2).join('.');
  };

  useEffect(() => {
    const checkAppLaunchCount = async () => {
      const appVersion = getMajorMinorVersion((Application.nativeApplicationVersion)!);
      const APP_LAUNCH_COUNT_KEY = `APP_LAUNCH_COUNT_${appVersion}`;

      const launchCount = await getData(APP_LAUNCH_COUNT_KEY);
      const count = launchCount ? parseInt(launchCount, 10) : 0;

      if (count >= 2) {
        setShowNewFeature(false);
      }

      await storeData(APP_LAUNCH_COUNT_KEY, (count + 1).toString());
    }

    checkAppLaunchCount().catch(err => console.error('Error reading/writing app launch count:', err));
  }, []);

  return (
    <PageLayout edges={['top']} style={{ backgroundColor: colors[theme].background }}>
      <HomeHeader />
      <HomeBannerAd />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {showNewFeature && <HomeNewFeature />}
        <HomeAnnouncement />
        <HomeBus />
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
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
