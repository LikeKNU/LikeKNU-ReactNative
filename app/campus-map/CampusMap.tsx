import CampusMapView from '@/app/campus-map/components/CampusMapView';
import MarkerFilter from '@/app/campus-map/components/MarkerFilter';
import PlaceCardContainer from '@/app/campus-map/components/PlaceCardContainer';
import BackHeader from '@/common/components/BackHeader';
import CampusSwitch from '@/common/components/CampusSwitch';
import PageLayout from '@/common/components/PageLayout';
import FontText from '@/common/text/FontText';
import { Campuses, campusName } from '@/constants/campus';
import { campusMapMockData } from '@/constants/campusMapMockData';
import colors, { campusColors } from '@/constants/colors';
import { Place, PlaceTypes } from '@/types/campusMapTypes';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const CampusMap = () => {
  const data = campusMapMockData;
  const [selectedCampus, setSelectedCampus] = useState<Campuses | null>(Campuses.CHEONAN);
  const [filter, setFilter] = useState<PlaceTypes | null>(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const [places, setPlaces] = useState<Place[]>(data);
  const [renderedPlaces, setRenderedPlaces] = useState<Place[]>(data);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync()
      .then(() => {
      });

    setPlaces(data);
    setRenderedPlaces(data);
  }, []);

  useEffect(() => {
    if (filter === null) {
      setRenderedPlaces(places);
      return;
    }

    setRenderedPlaces(places.filter(place => place.type === filter));
  }, [filter]);

  return (
    <PageLayout edges={['top']}>
      <BackHeader title={
        <FontText fontWeight="600" style={{
          fontSize: 20,
          color: campusColors[selectedCampus!]
        }}>{campusName[selectedCampus!].name}</FontText>
      } button={<CampusSwitch handleSelectCampus={setSelectedCampus} />} />
      <View style={styles.noticeContainer}>
        <FontText fontWeight="600" style={styles.notice}>아직 개발 중인 서비스에요</FontText>
        <FontText fontWeight="500" style={styles.subNotice}>의견이 있다면 오픈채팅으로 편하게 알려주세요</FontText>
      </View>
      <View style={{ flex: 1 }}>
        {!selectedMarkerId && <MarkerFilter filter={filter} setFilter={setFilter} />}
        <CampusMapView
          places={renderedPlaces}
          selectedCampus={selectedCampus!}
          filter={filter}
          selectedMarkerId={selectedMarkerId}
          handleTapMarker={setSelectedMarkerId}
        />
        {selectedMarkerId && <PlaceCardContainer placeId={selectedMarkerId} />}
      </View>
    </PageLayout>
  );
};

export default CampusMap;

const styles = StyleSheet.create({
  noticeContainer: {
    backgroundColor: colors.light.gray300,
    alignItems: 'center',
    paddingVertical: 8
  },
  notice: {
    color: colors.light.red
  },
  subNotice: {
    color: colors.light.gray100,
  }
});
