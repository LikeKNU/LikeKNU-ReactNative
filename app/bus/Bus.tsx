import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import { View } from 'react-native';

const Bus = () => {
  const { theme } = useTheme();

  return (
    <PageLayout edges={['top']}>
      <View>
        <FontText fontWeight="700" style={{ fontSize: 24 }}>버스</FontText>
      </View>
    </PageLayout>
  );
};

export default Bus;
