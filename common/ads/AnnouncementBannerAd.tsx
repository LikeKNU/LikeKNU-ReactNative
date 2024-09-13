import React, { useRef } from 'react';
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

const AnnouncementBannerAd = () => {
  const bannerRef = useRef<BannerAd>(null);
  const actualId = Platform.OS === 'ios' ? 'ca-app-pub-2814557138984161/8543242644' : 'ca-app-pub-2814557138984161/4603997638';
  const unitId = __DEV__ ? TestIds.BANNER : actualId;

  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });

  return (
    <BannerAd ref={bannerRef} unitId={unitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
  );
};

export default AnnouncementBannerAd;
