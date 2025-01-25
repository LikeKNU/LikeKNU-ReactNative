import SingwanCafeIcon from '@/assets/icons/maps/cafe.svg';
import SingwanCafeteriaIcon from '@/assets/icons/maps/cafeteria.svg';
import SingwanConvenienceIcon from '@/assets/icons/maps/convenience.svg';
import SingwanDormitoryIcon from '@/assets/icons/maps/dormitory.svg';
import SingwanHospitalIcon from '@/assets/icons/maps/hospital.svg';
import SingwanLibraryIcon from '@/assets/icons/maps/library.svg';
import SingwanRestaurantIcon from '@/assets/icons/maps/restaurant.svg';
import SingwanStudentIcon from '@/assets/icons/maps/student.svg';
import { PlaceTypes } from '@/types/campusMapTypes';

import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

const campusMapIcons: Record<PlaceTypes, FC<SvgProps>> = {
  'student': SingwanStudentIcon,
  'library': SingwanLibraryIcon,
  'dormitory': SingwanDormitoryIcon,
  'cafeteria': SingwanCafeteriaIcon,
  'convenience': SingwanConvenienceIcon,
  'cafe': SingwanCafeIcon,
  'hospital': SingwanHospitalIcon,
  'restaurant': SingwanRestaurantIcon
};

export default campusMapIcons;
