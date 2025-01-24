import BlueMapIcon from '@/assets/icons/blue-map.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const HomeCampusMap = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Pressable style={[styles.container, { backgroundColor: colors[theme].container, flex: 1 }]}
               /*onPress={() => router.navigate('/campus-map')}*/>
      <View style={styles.box}>
        <View style={styles.titleContainer}>
          <BlueMapIcon width={24} height={24} />
          <FontText fontWeight="700" style={styles.title}>캠퍼스 맵</FontText>
        </View>
        {/*<ArrowRightIcon />*/}
        <FontText style={{color: colors[theme].gray100}}>준비 중이에요 🧑🏻‍💻</FontText>
      </View>
    </Pressable>
  );
};

export default HomeCampusMap;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 10
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleContainer: {
    flexDirection: 'row', alignItems: 'center',
    gap: 6
  },
  title: {
    fontSize: 18
  }
});
