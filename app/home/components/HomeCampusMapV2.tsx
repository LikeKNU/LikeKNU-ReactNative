import BlueMapIcon from '@/assets/icons/blue-map.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Toast from 'react-native-root-toast';

const HomeCampusMapV2 = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors[theme].container, opacity: 0.6 }]}
      // onPress={() => router.navigate('/campus-map')}
      onPress={() => Toast.show('아직 준비 중이에요! 조금만 기다려 주세요 😊', {
        duration: Toast.durations.SHORT,
        backgroundColor: colors[theme].gray300,
        textColor: colors[theme].contrast,
        shadowColor: colors[theme].shadow,
        containerStyle: {
          borderRadius: 8,
          marginBottom: 70
        },
      })}
    >
      <View style={styles.box}>
        <BlueMapIcon width={28} height={28} />
        <View style={{ alignItems: 'center' }}>
          <FontText fontWeight="700" style={styles.title}>캠퍼스 맵</FontText>
          <FontText fontWeight="600" style={{ color: colors[theme].gray100, fontSize: 11 }}>준비 중</FontText>
        </View>
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
