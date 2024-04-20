import { Campuses } from '@/constants/campus';
import { getData } from '@/utils/storageManager';
import { useEffect, useState } from 'react';

const useCampus = () => {
  const [campus, setCampus] = useState<Campuses>(Campuses.SINGWAN);

  useEffect(() => {
    const fetchCampus = async () => {
      const storedCampus = await getData('campus');
      if (isCampus(storedCampus)) {
        setCampus(storedCampus);
      }
    };

    fetchCampus();
  }, []);

  return { campus }
};

export default useCampus;

const isCampus = (value: any): value is Campuses => {
  return Object.values(Campuses).includes(value);
}
