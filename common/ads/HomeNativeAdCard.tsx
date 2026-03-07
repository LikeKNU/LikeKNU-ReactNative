import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import {
  NativeAd,
  NativeAdChoicesPlacement,
  NativeAdView,
  NativeAsset,
  NativeAssetType,
  TestIds,
} from 'react-native-google-mobile-ads';

const unitId = __DEV__ ? TestIds.NATIVE : Platform.OS === 'ios'
  ? 'ca-app-pub-2814557138984161/6217486888'
  : 'ca-app-pub-2814557138984161/8161123946';

const HomeNativeAdCard = () => {
  const { theme } = useTheme();
  const [nativeAd, setNativeAd] = useState<NativeAd | null>(null);

  useEffect(() => {
    let isMounted = true;
    let loadedAd: NativeAd | null = null;

    NativeAd.createForAdRequest(unitId, {
      adChoicesPlacement: NativeAdChoicesPlacement.BOTTOM_RIGHT
    })
      .then((ad) => {
        if (isMounted) {
          loadedAd = ad;
          setNativeAd(ad);
        } else {
          ad.destroy();
        }
      })
      .catch(() => {
      });

    return () => {
      isMounted = false;
      loadedAd?.destroy();
    };
  }, []);

  if (!nativeAd) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors[theme].container }]}>
      <NativeAdView nativeAd={nativeAd}>
        <View style={styles.content}>
          {nativeAd.icon && (
            <NativeAsset assetType={NativeAssetType.ICON}>
              <Image source={{ uri: nativeAd.icon.url }} style={styles.icon} />
            </NativeAsset>
          )}
          <View style={styles.textContainer}>
            <NativeAsset assetType={NativeAssetType.HEADLINE}>
              <Text style={[styles.headline, { color: colors[theme].contrast }]} numberOfLines={1}>
                {nativeAd.headline}
              </Text>
            </NativeAsset>
            {nativeAd.body ? (
              <NativeAsset assetType={NativeAssetType.BODY}>
                <Text style={[styles.body, { color: colors[theme].gray100 }]} numberOfLines={1}>
                  {nativeAd.body}
                </Text>
              </NativeAsset>
            ) : null}
          </View>
          <View style={styles.adBadgeContainer}>
            <Text style={[styles.adBadge, { color: colors[theme].gray200 }]}>광고</Text>
          </View>
        </View>
      </NativeAdView>
    </View>
  );
};

export default HomeNativeAdCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 16,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  headline: {
    fontSize: 15,
    fontWeight: '600',
  },
  body: {
    fontSize: 13,
    marginTop: 4,
  },
  adBadgeContainer: {
    marginLeft: 8,
  },
  adBadge: {
    fontSize: 12,
  },
});
