export interface ClubListProps {
  id: number;
  name: string
  campus: string;
  category: string;
  tag: string;
}

export interface Club {
  id: number;
  name: string;
  campus: string;
  category: string;
  tag: string;
  contact?: string;
  instagram?: string;
  recruitmentPeriod?: string;
  logoImageUrl?: string;
  introduction: string;
  introductionImageUrl?: string;
  membershipMethod?: string;
  recruitmentUrl?: string;
}

export enum ClubTypes {
  ACADEMIC = 'academic',
  SPORTS = 'sports',
  ART = 'art',
  HOBBY = 'hobby',
  RELIGION = 'religion',
  VOLUNTEER = 'volunteer',
  PERFORMANCE = 'performance'
}
