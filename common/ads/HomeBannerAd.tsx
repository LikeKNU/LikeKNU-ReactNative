import React, { useRef } from 'react';
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

const HomeBannerAd = () => {
  const bannerRef = useRef<BannerAd>(null);
  const actualId = Platform.OS === 'ios' ? 'ca-app-pub-2814557138984161/3868586761' : 'ca-app-pub-2814557138984161/1294394314';
  const unitId = __DEV__ ? TestIds.BANNER : actualId;

  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });

  return (
    <BannerAd ref={bannerRef} unitId={unitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
  );
};

export default HomeBannerAd;
