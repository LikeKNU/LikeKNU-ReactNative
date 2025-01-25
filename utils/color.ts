import { Campuses, campusName } from '@/constants/campus';
import { campusColors, clubCategoryColors } from '@/constants/colors';
import { ClubCategories } from '@/constants/univClub';

export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const findCampusColor = (name: string) => {
  const campus = Object.entries(campusName)
    .find(([key, value]) => value.name === name);
  const foundCampus = Object.values(Campuses)
    .find(value => value === campus![0])!;
  return campusColors[foundCampus];
};

export const findClubCategoryColor = (categoryName: string) => {
  const foundCategoryColor = Object.entries(clubCategoryColors)
    .find(([key, value]) => value.name === categoryName);
  const foundCategory = Object.values(ClubCategories)
    .find(value => value === foundCategoryColor![0])!;
  return clubCategoryColors[foundCategory].color;
};
