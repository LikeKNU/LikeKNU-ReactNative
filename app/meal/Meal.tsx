import CafeteriasSelector from '@/app/meal/components/CafeteriasSelector';
import MealView from '@/app/meal/components/MealView';
import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import { useFavoriteCafeteria } from '@/common/contexts/FavoriteContext';
import useCampus from '@/common/hooks/useCampus';
import FontText from '@/common/text/FontText';
import { cafeterias, Cafeterias } from '@/constants/meal';
import { sortPinElementTop } from '@/utils/data';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';

const Meal = () => {
  const { campus } = useCampus();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [cafeteriaList, setCafeteriaList] = useState<Cafeterias[]>([]);
  const { favoriteCafeteria, changeFavoriteCafeteria } = useFavoriteCafeteria();

  useEffect(() => {
    setActiveIndex(0);

    if (campus) {
      setCafeteriaList(favoriteCafeteria ? sortPinElementTop<Cafeterias>(cafeterias[campus], cafeteria => cafeteria === favoriteCafeteria)
        : cafeterias[campus]);
    }
  }, [favoriteCafeteria, campus]);

  useEffect(() => {
    swiperRef.current?.scrollTo(activeIndex);
  }, [activeIndex]);

  const changeCafeteria = (index: number) => {
    setActiveIndex(index);
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
            <MealView cafeteria={value} favoriteCafeteria={favoriteCafeteria}
                      handleChangeFavorite={changeFavoriteCafeteria} />
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
