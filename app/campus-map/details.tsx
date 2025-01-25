import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import { campusMapMockData } from '@/constants/campusMapMockData';
import { useLocalSearchParams } from 'expo-router';

const CampusMapDetailsPage = () => {
  const { placeId } = useLocalSearchParams<{ placeId: string }>();
  const placeInfo = campusMapMockData.filter(place => place.id === Number(placeId))[0];

  return (
    <PageLayout edges={['top']}>
      <BackHeader title={placeInfo.name} />
    </PageLayout>
  );
};

export default CampusMapDetailsPage;
