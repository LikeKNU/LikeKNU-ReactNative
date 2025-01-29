import GuitarIcon from '@/assets/icons/guitar.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const HomeUnivClub = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors[theme].container }]}
      onPress={() => router.navigate('/univ-club')}
    >
      <View style={styles.box}>
        <GuitarIcon width={28} height={28} />
        <FontText fontWeight="700" style={styles.title}>동아리</FontText>
      </View>
    </Pressable>
  );
};

export default HomeUnivClub;

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
