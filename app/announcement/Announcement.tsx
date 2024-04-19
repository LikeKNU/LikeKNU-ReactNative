import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { View } from 'react-native';

const Announcement = () => {
  const { theme } = useTheme();

  return (
    <PageLayout edges={['top']} style={{ backgroundColor: colors[theme].container }}>
      <View>
        <FontText fontWeight="700" style={{ fontSize: 28, color: colors[theme].text }}>공지사항</FontText>
      </View>
    </PageLayout>
  );
};

export default Announcement;
