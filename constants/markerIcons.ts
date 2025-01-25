import CheonanCafeIcon from '@/assets/icons/markers/cheonan-cafe.svg';
import CheonanCafeteriaIcon from '@/assets/icons/markers/cheonan-cafeteria.svg';
import CheonanConvenienceIcon from '@/assets/icons/markers/cheonan-convenience.svg';
import CheonanDormitoryIcon from '@/assets/icons/markers/cheonan-dormitory.svg';
import CheonanHospitalIcon from '@/assets/icons/markers/cheonan-hospital.svg';
import CheonanLibraryIcon from '@/assets/icons/markers/cheonan-library.svg';
import CheonanRestaurantIcon from '@/assets/icons/markers/cheonan-restaurant.svg';
import CheonanStudentIcon from '@/assets/icons/markers/cheonan-student.svg';
import SingwanCafeIcon from '@/assets/icons/markers/singwan-cafe.svg';
import SingwanCafeteriaIcon from '@/assets/icons/markers/singwan-cafeteria.svg';
import SingwanConvenienceIcon from '@/assets/icons/markers/singwan-convenience.svg';
import SingwanDormitoryIcon from '@/assets/icons/markers/singwan-dormitory.svg';
import SingwanHospitalIcon from '@/assets/icons/markers/singwan-hospital.svg';
import SingwanLibraryIcon from '@/assets/icons/markers/singwan-library.svg';
import SingwanRestaurantIcon from '@/assets/icons/markers/singwan-restaurant.svg';
import SingwanStudentIcon from '@/assets/icons/markers/singwan-student.svg';
import YesanCafeIcon from '@/assets/icons/markers/yesan-cafe.svg';
import YesanCafeteriaIcon from '@/assets/icons/markers/yesan-cafeteria.svg';
import YesanConvenienceIcon from '@/assets/icons/markers/yesan-convenience.svg';
import YesanDormitoryIcon from '@/assets/icons/markers/yesan-dormitory.svg';
import YesanHospitalIcon from '@/assets/icons/markers/yesan-hospital.svg';
import YesanLibraryIcon from '@/assets/icons/markers/yesan-library.svg';
import YesanRestaurantIcon from '@/assets/icons/markers/yesan-restaurant.svg';
import YesanStudentIcon from '@/assets/icons/markers/yesan-student.svg';

import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

const markerIcons: Record<string, FC<SvgProps>> = {
  'singwan-student': SingwanStudentIcon,
  'singwan-library': SingwanLibraryIcon,
  'singwan-dormitory': SingwanDormitoryIcon,
  'singwan-cafeteria': SingwanCafeteriaIcon,
  'singwan-convenience': SingwanConvenienceIcon,
  'singwan-cafe': SingwanCafeIcon,
  'singwan-hospital': SingwanHospitalIcon,
  'singwan-restaurant': SingwanRestaurantIcon,
  'cheonan-student': CheonanStudentIcon,
  'cheonan-library': CheonanLibraryIcon,
  'cheonan-dormitory': CheonanDormitoryIcon,
  'cheonan-cafeteria': CheonanCafeteriaIcon,
  'cheonan-convenience': CheonanConvenienceIcon,
  'cheonan-cafe': CheonanCafeIcon,
  'cheonan-hospital': CheonanHospitalIcon,
  'cheonan-restaurant': CheonanRestaurantIcon,
  'yesan-student': YesanStudentIcon,
  'yesan-library': YesanLibraryIcon,
  'yesan-dormitory': YesanDormitoryIcon,
  'yesan-cafeteria': YesanCafeteriaIcon,
  'yesan-convenience': YesanConvenienceIcon,
  'yesan-cafe': YesanCafeIcon,
  'yesan-hospital': YesanHospitalIcon,
  'yesan-restaurant': YesanRestaurantIcon
};

export default markerIcons;
