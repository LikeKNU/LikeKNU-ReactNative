import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import GuitarIcon from '@/assets/icons/guitar.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Toast from 'react-native-root-toast';

const HomeUnivClub = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors[theme].container, flex: 1, opacity: 0.6 }]}
      /*onPress={() => router.navigate('/univ-club')}*/
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
        <View style={styles.titleContainer}>
          <GuitarIcon width={24} height={24} />
          <FontText fontWeight="700" style={styles.title}>동아리</FontText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontText fontWeight="600" style={{ fontSize: 12, color: colors[theme].gray100 }}>준비 중</FontText>
          <ArrowRightIcon />
        </View>
      </View>
    </Pressable>
  );
};

export default HomeUnivClub;

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
