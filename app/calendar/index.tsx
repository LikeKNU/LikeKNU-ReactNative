import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';

const CalendarPage = () => {
  return (
    <PageLayout edges={['top']}>
      <BackHeader title="학사일정" />
    </PageLayout>
  );
};

export default CalendarPage;
