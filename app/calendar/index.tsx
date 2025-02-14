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

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = now.getDay();
    return { year, month, date, day };
  };

  const getDayOfWeek = (day: number) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[day];
  };

  const { year, month, date, day } = getCurrentDate();

  return (
    <PageLayout edges={['top']}>
      <BackHeader title="학사일정" button={
        <View style={{ alignItems: 'flex-end' }}>
          <FontText style={{ color: colors[theme].gray100 }}>{`${year}`}</FontText>
          <FontText fontWeight="500" style={{ color: colors[theme].gray100 }}>
            {`${month}월 ${date}일(${getDayOfWeek(day)})`}
          </FontText>
        </View>
      } />
      <SectionList
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: bottom + 20 }}
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
