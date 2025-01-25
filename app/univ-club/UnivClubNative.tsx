import { useClubs } from '@/api/univClub';
import UnivClubListItem from '@/app/univ-club/components/UnivClubListItem';
import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const UnivClubNative = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { data, isValidating } = useClubs();
  const { bottom } = useSafeAreaInsets();

  return (
    <PageLayout edges={['top']} style={{ backgroundColor: colors[theme].container }}>
      <BackHeader title="동아리" onPress={() => router.back()} />
      <View style={[styles.noticeContainer, { backgroundColor: colors[theme].gray300 }]}>
        <FontText fontWeight="500" style={styles.notice}>앞으로 계속 동아리 정보가 추가될 예정이에요</FontText>
        <FontText fontWeight="300" style={[styles.subNotice, { color: colors[theme].gray100 }]}>
          동아리 연합회나 동아리장이 직접 등록해요
        </FontText>
      </View>
      {data && data.length !== 0 && !isValidating &&
        <FlatList
          contentContainerStyle={{ paddingBottom: bottom }}
          data={data}
          renderItem={({ item }) => <UnivClubListItem club={item} />}
        />
      }
    </PageLayout>
  );
};

export default UnivClubNative;

const styles = StyleSheet.create({
  container: {},
  noticeContainer: {
    alignItems: 'center',
    paddingVertical: 8
  },
  notice: {
    color: colors.blue
  },
  subNotice: {
    fontSize: 13
  }
});
