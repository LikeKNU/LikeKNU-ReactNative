import { Campuses } from '@/constants/campus';
import colors from '@/constants/colors';
import markerIcons from '@/constants/markerIcons';
import { PlaceTypes } from '@/types/campusMapTypes';
import { View } from 'react-native';

export interface MarkerIconProps {
  campus: Campuses;
  type: PlaceTypes;
}

const MarkerIcon = ({ campus, type }: MarkerIconProps) => {
  const key = `${campus}-${type}`;
  const IconComponent = markerIcons[key];
  return IconComponent ? (
    <View style={{ alignItems: 'center' }}>
      <IconComponent width={44} height={44} fill={colors.light.red} />
    </View>
  ) : null;
};

export default MarkerIcon;
