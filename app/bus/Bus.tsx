import CityBus from '@/app/bus/components/cityBus/CityBus';
import ShuttleBus from '@/app/bus/components/shuttleBus/ShuttleBus';
import BusBannerAd from '@/common/ads/BusBannerAd';
import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import TopTabs from '@/common/components/TopTabs';
import FontText from '@/common/text/FontText';
import { buses } from '@/constants/bus';
import { ValueNameType } from '@/types/common';
import { usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

const Bus = () => {
  const [busType, setBusType] = useState<ValueNameType>(buses.CITY_BUS);
  const pathname = usePathname();

  useEffect(() => {
    setBusType(buses.CITY_BUS);
  }, [pathname]);

  return (
    <PageLayout edges={['top']}>
      <TabHeader>
        <FontText fontWeight="700" style={styles.title}>버스</FontText>
      </TabHeader>
      <TopTabs
        handleTabPress={setBusType}
        activeTab={busType}
        tabItems={Object.values(buses).map(value => value)}
      />
      <BusBannerAd />
      {busType === buses.CITY_BUS && <CityBus />}
      {busType === buses.SHUTTLE_BUS && <ShuttleBus />}
    </PageLayout>
  );
};

export default Bus;

const styles = StyleSheet.create({
  title: {
    fontSize: 22
  }
});
