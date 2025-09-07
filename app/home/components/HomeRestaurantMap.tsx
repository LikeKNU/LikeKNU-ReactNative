import MapIcon from '@/assets/icons/blue-map.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const HomeRestaurantMap = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors[theme].container, opacity: 0.6 }]}
      onPress={() => router.navigate('/restaurant-map')}
      disabled={true}
    >
      <View style={styles.box}>
        <MapIcon width={28} height={28} />
        <View style={{ alignItems: 'center' }}>
          <FontText fontWeight="600" style={styles.title}>맛집지도</FontText>
          <FontText fontWeight="500" style={{ color: colors[theme].gray100, fontSize: 10 }}>준비 중</FontText>
        </View>
      </View>
    </Pressable>
  );
};

export default HomeRestaurantMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 82,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginBottom: 10
  },
  box: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4
  },
  title: {
    fontSize: 14
  }
});

