import CampusSetting from '@/app/more/components/CampusSetting';
import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import { Campuses } from '@/constants/campus';
import colors, { campusColors } from '@/constants/colors';
import { StyleSheet, View } from 'react-native';

const More = () => {
  const { theme } = useTheme();

  return (
    <PageLayout edges={['top']}>
      <TabHeader>
        <FontText fontWeight="700" style={styles.title}>더보기</FontText>
      </TabHeader>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10 }}>
        <CampusSetting />
      </View>
    </PageLayout>
  );
};

export default More;

const styles = StyleSheet.create({
  title: {
    fontSize: 22
  }
});
