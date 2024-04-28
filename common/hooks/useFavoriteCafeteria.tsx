import { Cafeterias } from '@/constants/meal';
import { getData, storeData } from '@/utils/storage';
import { useEffect, useState } from 'react';

const useFavoriteCafeteria = () => {
  const [favoriteCafeteria, setFavoriteCafeteria] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoriteCafeteria = async () => {
      const storedFavoriteCafeteria = await getData('favoriteCafeteria');
      if (storedFavoriteCafeteria) {
        setFavoriteCafeteria(storedFavoriteCafeteria);
      }
    };

    fetchFavoriteCafeteria();
  }, []);

  const changeFavoriteCafeteria = (cafeteria: Cafeterias) => {
    if (favoriteCafeteria === cafeteria) {
      setFavoriteCafeteria(null);
      storeData('favoriteCafeteria', '');
      return;
    }
    setFavoriteCafeteria(cafeteria);
    storeData('favoriteCafeteria', cafeteria);
  };

  return { favoriteCafeteria, changeFavoriteCafeteria }
};

export default useFavoriteCafeteria;
