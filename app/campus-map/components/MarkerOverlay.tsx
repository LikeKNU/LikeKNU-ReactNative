import MarkerIcon from '@/app/campus-map/components/MarkerIcon';
import { Campuses } from '@/constants/campus';
import colors from '@/constants/colors';
import { PlaceTypes } from '@/types/campusMapTypes';
import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';

export interface MarkerOverlayProps {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  selectedCampus: Campuses;
  type: PlaceTypes;
  selectedMarkerId?: number | null;
  handleMarkerPress: (id: number) => void;
}

const MarkerOverlay = (props: MarkerOverlayProps) => {
  return (
    <NaverMapMarkerOverlay
      isHidden={props.selectedMarkerId !== null && props.selectedMarkerId !== props.id}
      latitude={props.latitude}
      longitude={props.longitude}
      width={48}
      height={48}
      minZoom={14}
      onTap={() => {
        props.handleMarkerPress(props.id);
      }}
      caption={{
        text: props.name,
        color: colors.light.contrast,
        minZoom: 15,
        offset: -1,
        haloColor: colors.light.container
      }}
    >
      <MarkerIcon campus={props.selectedCampus} type={props.type} />
    </NaverMapMarkerOverlay>
  );
};

export default MarkerOverlay;
