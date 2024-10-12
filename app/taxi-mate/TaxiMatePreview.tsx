import TaxiFrontIcon from '@/assets/icons/taxi-front.svg';
import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { StyleSheet, View } from 'react-native';

const TaxiMatePreview = () => {
  const { theme } = useTheme();

  return (
    <PageLayout edges={['top']}>
      <BackHeader />
      <View style={styles.container}>
        <TaxiFrontIcon width={128} height={128} />
        <FontText fontWeight="700" style={{ fontSize: 24 }}>공주대학교 택시팟</FontText>
        <FontText fontWeight="600" style={{ fontSize: 18, color: colors[theme].gray100 }}>곧 출시합니다!</FontText>
      </View>
    </PageLayout>
  );
};

export default TaxiMatePreview;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 100
  }
});
