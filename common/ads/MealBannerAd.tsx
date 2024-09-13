import React, { useRef } from 'react';
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

const MealBannerAd = () => {
  const bannerRef = useRef<BannerAd>(null);
  const actualId = Platform.OS === 'ios' ? 'ca-app-pub-2814557138984161/9280737109' : 'ca-app-pub-2814557138984161/2589565622';
  const unitId = __DEV__ ? TestIds.BANNER : actualId;

  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });

  return (
    <BannerAd ref={bannerRef} unitId={unitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
  );
};

export default MealBannerAd;
