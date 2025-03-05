import { getData, removeData, storeData } from '@/utils/storage';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

export interface FavoriteContextProviderProps {
  favoriteCafeteria: string | null;
  changeFavoriteCafeteria: (arg1: string) => void;
}

const FavoriteContext = createContext<FavoriteContextProviderProps | null>(null);

const FavoriteContextProvider = ({ children }: PropsWithChildren) => {
  const [favoriteCafeteria, setFavoriteCafeteria] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorite = async () => {
      const storedFavorite = await getData('favoriteCafeteria');
      if (storedFavorite) {
        setFavoriteCafeteria(storedFavorite ?? null);
      }
    };

    fetchFavorite();
  }, [favoriteCafeteria]);

  const changeFavoriteCafeteria = (cafeteriaId: string) => {
    if (favoriteCafeteria === cafeteriaId) {
      removeData('favoriteCafeteria');
      setFavoriteCafeteria(null);
      return;
    }

    storeData('favoriteCafeteria', cafeteriaId);
    setFavoriteCafeteria(cafeteriaId);
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
