import CautionIcon from '@/assets/icons/caution.svg';
import HomeBannerAd from '@/common/ads/HomeBannerAd';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { View } from 'react-native';

const MaintenancePage = () => {
  const { theme } = useTheme();

  return (
    <PageLayout>
      <HomeBannerAd />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CautionIcon width={80} height={80} />
        <FontText fontWeight="700" style={{ fontSize: 20, marginTop: 12 }}> 서비스를 점검 중이에요</FontText>
        <FontText fontWeight="500" style={{ color: colors[theme].gray100, fontSize: 18, marginTop: 4 }}>
          조금만 기다려주세요 🙇🏻‍♂️
        </FontText>
      </View>
    </PageLayout>
  );
};

export default MaintenancePage;
