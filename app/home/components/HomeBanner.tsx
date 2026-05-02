import { useHomeBanners } from '@/api/home';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import XMarkIcon from '@/assets/icons/xmark.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { HomeBannerProps } from '@/types/homeType';
import { getData, storeData } from '@/utils/storage';
import * as Application from 'expo-application';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { Easing, withTiming } from 'react-native-reanimated';

const DISMISSED_BANNERS_KEY = 'dismissedHomeBanners';
const VIEW_COUNTS_KEY = 'homeBannerViewCounts';
const MAX_VIEWS = 2;
const BANNER_MARGIN_BOTTOM = 10;

type ViewCounts = Record<number, number>;

const growFadeIn = (values: { targetHeight: number }) => {
  'worklet';
  const duration = 280;
  const easing = Easing.out(Easing.cubic);
  return {
    initialValues: {
      opacity: 0,
      height: 0,
      marginBottom: 0
    },
    animations: {
      opacity: withTiming(1, { duration, easing }),
      height: withTiming(values.targetHeight, { duration, easing }),
      marginBottom: withTiming(BANNER_MARGIN_BOTTOM, { duration, easing })
    }
  };
};

const shrinkFadeOut = (values: { currentHeight: number }) => {
  'worklet';
  const duration = 220;
  const easing = Easing.in(Easing.cubic);
  return {
    initialValues: {
      opacity: 1,
      height: values.currentHeight,
      marginBottom: BANNER_MARGIN_BOTTOM
    },
    animations: {
      opacity: withTiming(0, { duration, easing }),
      height: withTiming(0, { duration, easing }),
      marginBottom: withTiming(0, { duration, easing })
    }
  };
};

const compareVersions = (a: string, b: string) => {
  const aParts = a.split('.').map(Number);
  const bParts = b.split('.').map(Number);
  const length = Math.max(aParts.length, bParts.length);
  for (let i = 0; i < length; i++) {
    const aValue = aParts[i] ?? 0;
    const bValue = bParts[i] ?? 0;
    if (aValue !== bValue) {
      return aValue - bValue;
    }
  }
  return 0;
};

const meetsVersionRequirement = (banner: HomeBannerProps) => {
  if (!banner.minAppVersion) {
    return true;
  }
  const currentVersion = Application.nativeApplicationVersion;
  if (!currentVersion) {
    return false;
  }
  return compareVersions(currentVersion, banner.minAppVersion) >= 0;
};

const HomeBanner = () => {
  const { data: banners } = useHomeBanners();
  const [dismissedIds, setDismissedIds] = useState<number[] | null>(null);
  const [viewCounts, setViewCounts] = useState<ViewCounts | null>(null);
  const incrementedRef = useRef(new Set<number>());

  useEffect(() => {
    (async () => {
      const dismissedStored = await getData(DISMISSED_BANNERS_KEY);
      const countsStored = await getData(VIEW_COUNTS_KEY);
      setDismissedIds(dismissedStored ? JSON.parse(dismissedStored) : []);
      setViewCounts(countsStored ? JSON.parse(countsStored) : {});
    })();
  }, []);

  const visibleBanners =
    banners && dismissedIds !== null && viewCounts !== null
      ? banners.filter(
          (banner) =>
            !dismissedIds.includes(banner.bannerId) &&
            meetsVersionRequirement(banner) &&
            (viewCounts[banner.bannerId] ?? 0) < MAX_VIEWS
        )
      : [];
  const currentBanner = visibleBanners[0];
  const isLastBanner = visibleBanners.length === 1;

  useEffect(() => {
    if (!currentBanner || !viewCounts) return;
    if (incrementedRef.current.has(currentBanner.bannerId)) return;
    incrementedRef.current.add(currentBanner.bannerId);

    const next = {
      ...viewCounts,
      [currentBanner.bannerId]: (viewCounts[currentBanner.bannerId] ?? 0) + 1
    };
    storeData(VIEW_COUNTS_KEY, JSON.stringify(next));
  }, [currentBanner?.bannerId]);

  const dismiss = async (bannerId: number) => {
    const next = [...(dismissedIds ?? []), bannerId];
    setDismissedIds(next);
    await storeData(DISMISSED_BANNERS_KEY, JSON.stringify(next));
  };

  if (!banners || dismissedIds === null || viewCounts === null) {
    return null;
  }

  return (
    <View>
      {currentBanner && (
        <Animated.View
          key={currentBanner.bannerId}
          entering={growFadeIn}
          exiting={isLastBanner ? undefined : shrinkFadeOut}
          style={styles.banner}
        >
          <BannerCard
            banner={currentBanner}
            onDismiss={() => dismiss(currentBanner.bannerId)}
          />
        </Animated.View>
      )}
    </View>
  );
};

interface BannerCardProps {
  banner: HomeBannerProps;
  onDismiss: () => void;
}

const BannerCard = ({ banner, onDismiss }: BannerCardProps) => {
  const { theme } = useTheme();
  const router = useRouter();

  const onPress = () => {
    if (banner.linkPath) {
      router.push(banner.linkPath as never);
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={!banner.linkPath}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: pressed && banner.linkPath ? colors[theme].press : colors[theme].container }
      ]}
    >
      <View style={styles.textBox}>
        <View style={styles.titleRow}>
          <FontText
            fontWeight="700"
            numberOfLines={1}
            style={[styles.title, { color: colors[theme].contrast }]}
          >
            {banner.title}
          </FontText>
          {banner.linkPath && (
            <ArrowRightIcon width={16} height={16} />
          )}
        </View>
        <FontText style={[styles.body, { color: colors[theme].gray100 }]}>
          {banner.body}
        </FontText>
      </View>
      <Pressable hitSlop={8} onPress={onDismiss} style={styles.closeButton}>
        <XMarkIcon width={18} height={18} fill={colors[theme].gray200} />
      </Pressable>
    </Pressable>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  banner: {
    marginBottom: BANNER_MARGIN_BOTTOM,
    overflow: 'hidden'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 12
  },
  textBox: {
    flex: 1,
    gap: 4
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  title: {
    flexShrink: 1,
    fontSize: 15
  },
  body: {
    fontSize: 13,
    lineHeight: 18
  },
  closeButton: {
    padding: 2
  }
});
