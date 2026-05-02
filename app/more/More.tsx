import CampusSetting from '@/app/more/components/CampusSetting';
import NotificationSetting from '@/app/more/components/NotificationSetting';
import ThemeSetting from '@/app/more/components/ThemeSetting';
import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { StyleSheet, View } from 'react-native';

const More = () => {
  const { theme } = useTheme();

  return (
    <PageLayout edges={['top']}>
      <TabHeader>
        <FontText fontWeight="700" style={styles.title}>더보기</FontText>
      </TabHeader>
      <View style={styles.settingContainer}>
        <FontText fontWeight="600"
                  style={[styles.settingTitle, { color: colors[theme].gray100 }]}>캠퍼스</FontText>
        <CampusSetting />
        <FontText fontWeight="600" style={[styles.settingTitle, { color: colors[theme].gray100 }]}>화면 테마</FontText>
        <ThemeSetting />
        <FontText fontWeight="600" style={[styles.settingTitle, { color: colors[theme].gray100 }]}>알림</FontText>
        <NotificationSetting />
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <FontText style={{ fontSize: 15, color: colors[theme].gray100 }}>문의나 건의사항, 오류제보는 홈에 있는</FontText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontText fontWeight="600" style={{ fontSize: 15, color: colors[theme].gray100 }}>
              문의/요청(1:1 오픈채팅방)
            </FontText>
            <FontText style={{ fontSize: 15, color: colors[theme].gray100 }}>을 통해</FontText>
          </View>
          <FontText style={{ fontSize: 15, color: colors[theme].gray100 }}>편하게 전달해주세요!😋</FontText>
        </View>
      </View>
    </PageLayout>
  );
};

export default More;

const styles = StyleSheet.create({
  title: {
    fontSize: 22
  },
  settingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  settingTitle: {
    fontSize: 18
  }
});
