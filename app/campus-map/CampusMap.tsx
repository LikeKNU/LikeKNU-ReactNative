import SwitchingIcon from '@/assets/icons/arrow-light-arrow-left.svg';
import MapMarkerIcon from '@/assets/icons/markers/singwan-student.svg';
import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import { Campuses, campusName } from '@/constants/campus';
import colors, { campusColors } from '@/constants/colors';
import { NaverMapMarkerOverlay, NaverMapView, NaverMapViewRef } from '@mj-studio/react-native-naver-map';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { ActionSheetIOS, Pressable, StyleSheet, View } from 'react-native';

export interface MarkerIconProps {
  campus: Campuses;
  name: string;
  type: string;
}

const MarkerIcon = ({ campus, name, type }: MarkerIconProps) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <MapMarkerIcon fill={campusColors[campus]} width={44} height={44} />
    </View>
  );
};

const CampusMap = () => {
  const naverMapRef = useRef<NaverMapViewRef>(null);
  const { campus } = useCampus();
  const [selectedCampus, setSelectedCampus] = useState<Campuses>(campus!);
  const { theme } = useTheme();

  useEffect(() => {
    Location.requestForegroundPermissionsAsync()
      .then(() => {
      });
  }, []);

  const getCampusCenterCoordinateAndZoom = (campus: Campuses) => {
    switch (campus) {
      case Campuses.SINGWAN:
        return { latitude: 36.469096, longitude: 127.140598, zoom: 15.5 };
      case Campuses.CHEONAN:
        return { latitude: 36.8506431, longitude: 127.150501, zoom: 16 };
      case Campuses.YESAN:
        return { latitude: 36.670987, longitude: 126.859612, zoom: 16 };
    }
  };

  useEffect(() => {
    const { latitude, longitude, zoom } = getCampusCenterCoordinateAndZoom(selectedCampus);
    naverMapRef.current?.animateCameraTo({
      latitude: latitude,
      longitude: longitude,
      zoom: zoom,
      easing: 'Fly'
    });
  }, [selectedCampus]);

  return (
    <PageLayout edges={['top']}>
      <BackHeader title={
        <FontText fontWeight="600" style={{
          fontSize: 20,
          color: campusColors[selectedCampus]
        }}>{campusName[selectedCampus].name}</FontText>
      } button={
        <Pressable
          style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 2, paddingVertical: 6 }}
          onPress={() => {
            ActionSheetIOS.showActionSheetWithOptions({
              title: '캠퍼스를 선택하세요',
              options: Object.values(Campuses).map(campus => campusName[campus].name)
                .concat(['닫기']),
              cancelButtonIndex: Object.values(Campuses).length,
              cancelButtonTintColor: colors[theme].red
            }, index => {
              if (index === Object.values(Campuses).length) return;
              setSelectedCampus(Object.values(Campuses)[index]);
            });
          }}
        >
          <SwitchingIcon width={14} height={14} fill={colors[theme].gray100} />
          <FontText fontWeight="700" style={{ color: colors[theme].gray100, fontSize: 15 }}>캠퍼스 변경</FontText>
        </Pressable>
      } />
      <NaverMapView
        ref={naverMapRef}
        style={{ flex: 1 }}
        initialCamera={getCampusCenterCoordinateAndZoom(selectedCampus)}
        isShowZoomControls={false}
        minZoom={14}
      >
        <NaverMapMarkerOverlay
          latitude={36.469096}
          longitude={127.140598}
          caption={{
            text: '8공학관',
            color: colors.light.contrast,
            minZoom: 15,
            offset: -1,
            haloColor: colors.light.container
          }}
        >
          <MarkerIcon campus={selectedCampus} name={'아무거나'} type={'아무거나'} />
        </NaverMapMarkerOverlay>
      </NaverMapView>
    </PageLayout>
  );
};

export default CampusMap;

const styles = StyleSheet.create({});
