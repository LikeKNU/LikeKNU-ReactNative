import { useAdAnnouncement } from '@/api/announcement';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Hyperlink } from 'react-native-hyperlink';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AdViewProps {
  id: string;
}

const AdPage = ({ id }: AdViewProps) => {
  const { theme } = useTheme();
  const { data } = useAdAnnouncement(id);
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  return (
    <PageLayout edges={['top']}>
      <View style={styles.container}>
        <View style={styles.backIcon}>
          <Pressable style={styles.backPressable} onPress={() => {
            if (router.canGoBack()) {
              router.back();
              return;
            }
            router.replace('/');
          }}>
            <ArrowLeftIcon width={24} height={24} fill={colors[theme].gray100} />
          </Pressable>
        </View>
        <FontText fontWeight="600" style={[styles.title, { color: colors[theme].contrast }]}>{data?.title}</FontText>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
        </View>
      </View>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Hyperlink linkDefault={true} linkStyle={{ color: '#2980b9', fontSize: 15 }}>
          <FontText style={{ fontSize: 15, paddingBottom: bottom < 20 ? 20 : bottom }}>
            {data?.contents}
          </FontText>
        </Hyperlink>
      </ScrollView>
    </PageLayout>
  );
};

export default AdPage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 16,
    paddingHorizontal: 10
  },
  title: {
    flex: 5,
    fontSize: 18,
    textAlign: 'center'
  },
  backPressable: {
    paddingVertical: 2,
    paddingRight: 20
  },
  backIcon: {
    flex: 1,
    flexDirection: 'row'
  }
});
