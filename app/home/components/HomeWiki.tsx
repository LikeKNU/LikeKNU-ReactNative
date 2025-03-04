import WikiBookIcon from '@/assets/icons/wiki-book.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const HomeWiki = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors[theme].container, opacity: .6 }]}
      /*onPress={() => router.navigate('/wiki')}*/
    >
      <View style={styles.box}>
        <WikiBookIcon width={28} height={28} />
        <View style={{ alignItems: 'center' }}>
          <FontText fontWeight="700" style={styles.title}>위키</FontText>
          <FontText fontWeight="600" style={{ fontSize: 11, color: colors[theme].gray100 }}>준비 중</FontText>
        </View>
      </View>
    </Pressable>
  );
};

export default HomeWiki;

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
