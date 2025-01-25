import BlueMapIcon from '@/assets/icons/blue-map.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const HomeCampusMapV2 = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors[theme].container }]}
      onPress={() => router.navigate('/campus-map')}
    >
      <View style={styles.box}>
        <BlueMapIcon width={28} height={28} />
        <FontText fontWeight="700" style={styles.title}>캠퍼스 맵</FontText>
      </View>
    </Pressable>
  );
};

export default HomeCampusMapV2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 82,
    justifyContent: 'center',
    borderRadius: 16,
    marginBottom: 10
  },
  box: {
    alignItems: 'center',
    gap: 4
  },
  title: {
    fontSize: 13
  }
});
