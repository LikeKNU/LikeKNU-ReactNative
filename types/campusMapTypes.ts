/*export type PlaceTypes =
  'student'
  | 'library'
  | 'dormitory'
  | 'cafeteria'
  | 'convenience'
  | 'cafe'
  | 'hospital'
  | 'restaurant';*/

export enum PlaceTypes {
  STUDENT = 'student',
  LIBRARY = 'library',
  DORMITORY = 'dormitory',
  CAFETERIA = 'cafeteria',
  CONVENIENCE = 'convenience',
  CAFE = 'cafe',
  HOSPITAL = 'hospital',
  RESTAURANT = 'restaurant'
}

export interface Place {
  id: number;
  latitude: number;
  longitude: number;
  type: PlaceTypes;
  name: string;
}
