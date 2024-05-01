import { Campuses } from '@/constants/campus';
import { getData, storeData } from '@/utils/storage';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

export interface CampusContextProviderProps {
  campus: Campuses | null;
  changeCampus: (newCampus: Campuses) => void;
}

const CampusContext = createContext<CampusContextProviderProps | null>(null);

const CampusContextProvider = ({ children }: PropsWithChildren) => {
  const [campus, setCampus] = useState<Campuses | null>(null);

  useEffect(() => {
    const fetchCampus = async () => {
      const storedCampus = await getData('campus');
      if (isCampus(storedCampus)) {
        setCampus(storedCampus);
      } else {
        await storeData('campus', Campuses.SINGWAN);
        setCampus(Campuses.SINGWAN);
      }
    };

    fetchCampus();
  }, [campus]);

  const isCampus = (value: any): value is Campuses => {
    return Object.values(Campuses).includes(value);
  };

  const changeCampus = (newCampus: Campuses) => {
    if (campus !== newCampus) {
      storeData('campus', newCampus);
      setCampus(newCampus);
    }
  };

  const contextValue = { campus, changeCampus };

  return (
    <CampusContext.Provider value={contextValue}>
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => {
  const campusContext = useContext(CampusContext);
  if (!campusContext) {
    throw new Error('no theme context');
  }
  return campusContext;
};

export default CampusContextProvider;
