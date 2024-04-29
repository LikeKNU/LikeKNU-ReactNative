import { Cafeterias } from '@/constants/meal';
import { getData, removeData, storeData } from '@/utils/storage';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

export interface FavoriteContextProviderProps {
  favoriteCafeteria: Cafeterias | null;
  changeFavoriteCafeteria: (arg1: Cafeterias) => void;
}

const FavoriteContext = createContext<FavoriteContextProviderProps | null>(null);

const FavoriteContextProvider = ({ children }: PropsWithChildren) => {
  const [favoriteCafeteria, setFavoriteCafeteria] = useState<Cafeterias | null>(null);

  useEffect(() => {
    const fetchFavorite = async () => {
      const storedFavorite = await getData('favoriteCafeteria');
      if (storedFavorite) {
        const find = Object.values<Cafeterias>(Cafeterias)
          .find(value => value === storedFavorite);
        setFavoriteCafeteria(find ?? null);
      }
    };

    fetchFavorite();
  }, [favoriteCafeteria]);

  const changeFavoriteCafeteria = (cafeteria: Cafeterias) => {
    if (favoriteCafeteria === cafeteria) {
      removeData('favoriteCafeteria');
      setFavoriteCafeteria(null);
      return;
    }

    storeData('favoriteCafeteria', cafeteria);
    setFavoriteCafeteria(cafeteria);
  };

  const contextValue = { favoriteCafeteria, changeFavoriteCafeteria };

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteCafeteria = () => {
  const favoriteContext = useContext(FavoriteContext);
  if (!favoriteContext) {
    throw new Error('no theme context');
  }
  return favoriteContext;
};

export default FavoriteContextProvider;
