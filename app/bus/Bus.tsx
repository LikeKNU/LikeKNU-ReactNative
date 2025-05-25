import CityBus from '@/app/bus/components/cityBus/CityBus';
import ShuttleBus from '@/app/bus/components/shuttleBus/ShuttleBus';
import BusBannerAd from '@/common/ads/BusBannerAd';
import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import TabTitle from '@/common/components/TabTitle';
import TopTabs from '@/common/components/TopTabs';
import { buses } from '@/constants/bus';
import { ValueNameType } from '@/types/common';
import { useState } from 'react';

const Bus = () => {
  const [busType, setBusType] = useState<ValueNameType>(buses.SHUTTLE_BUS);

  return (
    <PageLayout edges={['top']}>
      <TabHeader>
        <TabTitle title="버스" />
      </TabHeader>
      <TopTabs
        handleTabPress={setBusType}
        activeTab={busType}
        tabItems={Object.values(buses).map(value => value)}
      />
      <BusBannerAd />
      {busType === buses.SHUTTLE_BUS && <ShuttleBus />}
      {busType === buses.CITY_BUS && <CityBus />}
    </PageLayout>
  );
};

export default Bus;
