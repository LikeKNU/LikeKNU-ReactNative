import OpenBookIcon from '@/assets/icons/open-book.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const HomeLibraryV2 = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors[theme].container }]}
      onPress={() => router.navigate('/library')}
    >
      <View style={styles.box}>
        <OpenBookIcon width={28} height={28} />
        <FontText fontWeight="700" style={styles.title}>도서관</FontText>
      </View>
    </Pressable>
  );
};

export default HomeLibraryV2;

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
