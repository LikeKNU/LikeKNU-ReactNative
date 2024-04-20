import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';

interface AnnouncementViewProps {
  url: string;
}

const AnnouncementView = ({ url }: AnnouncementViewProps) => {
  const { theme } = useTheme();

  return (
    <PageLayout edges={['top']}>
      <FontText style={{ color: colors[theme].text }}>
        {url}
      </FontText>
    </PageLayout>
  );
};

export default AnnouncementView;
