import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const HomeNewFeature = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors[theme].container }]}>
      <FontText fontWeight="700" style={styles.title}>🚌 버스 전체 시간표 기능이 추가되었습니다!</FontText>
    </View>
  );
};

export default HomeNewFeature;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 10
  },
  title: {
    fontSize: 16
  }
});
