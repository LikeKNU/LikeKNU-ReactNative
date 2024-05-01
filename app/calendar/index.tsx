import { useCalendar } from '@/api/calendar';
import ScheduleItem from '@/app/calendar/components/ScheduleItem';
import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { SectionList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CalendarPage = () => {
  const { theme } = useTheme();
  const { data } = useCalendar();
  const { bottom } = useSafeAreaInsets();
  const sectionedData = data ? data.map(calendar => ({
    title: calendar.scheduleCriterion,
    data: calendar.scheduleWrapper
  })) : [];

  return (
    <PageLayout edges={['top']}>
      <BackHeader title="학사일정" />
      <SectionList
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: bottom }}
        sections={sectionedData}
        keyExtractor={item => item.scheduleDate + item.scheduleContents}
        renderItem={({ item }) => <ScheduleItem schedule={item} />}
        renderSectionHeader={({ section: { title } }) =>
          <View style={{ backgroundColor: colors[theme].container, paddingBottom: 8, paddingTop: 20 }}>
            <FontText fontWeight="700" style={{ fontSize: 18 }}>{title}</FontText>
          </View>
        }
      />
    </PageLayout>
  );
};

export default CalendarPage;
