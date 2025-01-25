import MarkerOverlay from '@/app/campus-map/components/MarkerOverlay';
import { Campuses } from '@/constants/campus';
import { campusMapMockData } from '@/constants/campusMapMockData';
import { Place, PlaceTypes } from '@/types/campusMapTypes';
import { NaverMapView, NaverMapViewRef } from '@mj-studio/react-native-naver-map';
import { useEffect, useRef } from 'react';

interface CampusMapViewProps {
  places: Place[];
  selectedCampus: Campuses;
  filter: PlaceTypes | null;
  selectedMarkerId: number | null;
  handleTapMarker: (value: (((prevState: (number | null)) => (number | null)) | number | null)) => void;
}

const CampusMapView = ({ places, selectedCampus, selectedMarkerId, handleTapMarker, filter }: CampusMapViewProps) => {
  const naverMapRef = useRef<NaverMapViewRef>(null);

  useEffect(() => {
    animateCameraBounds(places);
  }, [places]);

  useEffect(() => {
    animateCameraCenterCoordinate();
  }, [selectedCampus]);

  useEffect(() => {
    if (selectedMarkerId) {
      naverMapRef.current?.animateCameraTo({
        latitude: campusMapMockData.find(value => value.id === selectedMarkerId)!.latitude,
        longitude: campusMapMockData.find(value => value.id === selectedMarkerId)!.longitude,
        zoom: 17,
        pivot: {
          x: 0.5,
          y: 0.3
        }
      });
      return;
    }

    !filter ? animateCameraCenterCoordinate() : animateCameraBounds(places);
  }, [selectedMarkerId]);

  useEffect(() => {
    animateCameraBounds(places);

    if (!selectedMarkerId && !filter) {
      animateCameraCenterCoordinate();
    }
  }, [places]);

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

  const getBounds = (places: Place[]) => {
    const latitudes = places.map(place => place.latitude);
    const longitudes = places.map(place => place.longitude);

    const margin = 0.001;
    const minLatitude = Math.min(...latitudes) - margin;
    const maxLatitude = Math.max(...latitudes) + margin;
    const minLongitude = Math.min(...longitudes) - margin;
    const maxLongitude = Math.max(...longitudes) + margin;

    return {
      minLatitude,
      maxLatitude,
      minLongitude,
      maxLongitude
    };
  };

  const animateCameraCenterCoordinate = () => {
    const { latitude, longitude, zoom } = getCampusCenterCoordinateAndZoom(selectedCampus);
    naverMapRef.current?.animateCameraTo({
      latitude: latitude,
      longitude: longitude,
      zoom: zoom,
      easing: 'Fly'
    });
  };

  const animateCameraBounds = (places: Place[]) => {
    const { maxLatitude, maxLongitude, minLatitude, minLongitude } = getBounds(places);
    naverMapRef.current?.animateCameraWithTwoCoords({
      coord1: {
        latitude: maxLatitude,
        longitude: maxLongitude
      },
      coord2: {
        latitude: minLatitude,
        longitude: minLongitude
      }
    });
  };

  return (
    <NaverMapView
      style={{ flex: 1 }}
      ref={naverMapRef}
      initialCamera={getCampusCenterCoordinateAndZoom(selectedCampus)}
      isShowZoomControls={false}
      minZoom={14}
      onTapMap={() => handleTapMarker(null)}
    >
      {places.map((data, index) => (
        <MarkerOverlay
          key={data.id}
          id={data.id}
          latitude={data.latitude}
          longitude={data.longitude}
          name={data.name}
          selectedCampus={selectedCampus}
          type={data.type}
          selectedMarkerId={selectedMarkerId}
          handleMarkerPress={
            (id) => selectedMarkerId === id ? handleTapMarker(null) : handleTapMarker(id)
          }
        />
      ))}
    </NaverMapView>
  );
};

export default CampusMapView;
