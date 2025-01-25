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
