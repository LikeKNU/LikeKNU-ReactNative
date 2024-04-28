import CafeteriasSelector from '@/app/meal/components/CafeteriasSelector';
import MealView from '@/app/meal/components/MealView';
import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import useCampus from '@/common/hooks/useCampus';
import FontText from '@/common/text/FontText';
import { cafeterias, Cafeterias } from '@/constants/meal';
import { sortPinElementTop } from '@/utils/data';
import { getData, storeData } from '@/utils/storage';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';

const Meal = () => {
  const { campus } = useCampus();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [favorite, setFavorite] = useState<string>();
  const [cafeteriaList, setCafeteriaList] = useState<Cafeterias[]>([]);

  const getFavoriteCafeteria = async () => {
    const favorite = await getData('favoriteCafeteria');
    if (favorite) {
      setFavorite(favorite);
    }
  };

  useEffect(() => {
    getFavoriteCafeteria();
    setCafeteriaList(campus ? cafeterias[campus] : []);
  }, [campus]);

  useEffect(() => {
    if (favorite) {
      setActiveIndex(0);

      const sorted = sortPinElementTop<Cafeterias>(cafeteriaList, cafeteria => cafeteria === favorite);
      setCafeteriaList(sorted);
    }
  }, [favorite]);

  useEffect(() => {
    swiperRef.current?.scrollTo(activeIndex);
  }, [activeIndex]);

  const changeCafeteria = (index: number) => {
    setActiveIndex(index);
  };

  const setFavoriteCafeteria = async (cafeteria: Cafeterias) => {
    setFavorite(cafeteria);
    await storeData('favoriteCafeteria', cafeteria);
  };

  return (
    <PageLayout edges={['top']}>
      <TabHeader>
        <FontText fontWeight="700" style={styles.title}>식단</FontText>
      </TabHeader>
      <CafeteriasSelector
        cafeteriaList={cafeteriaList}
        activeIndex={activeIndex}
        handleOnPress={changeCafeteria}
      />
      <Swiper
        ref={swiperRef}
        showsButtons={false}
        loop={false}
        onIndexChanged={setActiveIndex}
        showsPagination={false}
      >
        {cafeteriaList.map(value => (
          <View key={value} style={styles.page}>
            <MealView cafeteria={value} favoriteCafeteria={favorite} handleChangeFavorite={setFavoriteCafeteria} />
          </View>
        ))}
      </Swiper>
    </PageLayout>
  );
};

export default Meal;

const styles = StyleSheet.create({
  title: {
    fontSize: 22
  },
  page: {
    alignItems: 'center',
    paddingHorizontal: 20
  }
});
