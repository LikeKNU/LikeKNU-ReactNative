import CampusSetting from '@/app/more/components/CampusSetting';
import SuggestionItem from '@/app/more/components/SuggestionItem';
import ThemeSetting from '@/app/more/components/ThemeSetting';
import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

const More = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const changeVisible = (visible: boolean) => {
    setIsVisible(visible);
  };

  return (
    <PageLayout edges={['top']}>
      <TabHeader>
        <FontText fontWeight="700" style={styles.title}>더보기</FontText>
      </TabHeader>
      <View style={styles.settingContainer}>
        {isVisible && <>
          <FontText fontWeight="600"
                    style={[styles.settingTitle, { color: colors[theme].gray100 }]}>캠퍼스</FontText>
          <CampusSetting />
          <FontText fontWeight="600" style={[styles.settingTitle, { color: colors[theme].gray100 }]}>화면 테마</FontText>
          <ThemeSetting />
        </>}
        <SuggestionItem changeVisible={changeVisible} />
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
