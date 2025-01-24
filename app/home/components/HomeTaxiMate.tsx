import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import TaxiFrontIcon from '@/assets/icons/taxi-front.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const HomeTaxiMate = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Pressable style={[styles.container, { backgroundColor: colors[theme].container, flex: 1 }]}
               onPress={() => router.replace('/taxi-mate')}>
      <View style={styles.box}>
        <View style={styles.titleContainer}>
          <TaxiFrontIcon width={24} height={24} />
          <FontText fontWeight="700" style={styles.title}>택시팟</FontText>
        </View>
        <ArrowRightIcon />
      </View>
    </Pressable>
  );
};

export default HomeTaxiMate;

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
