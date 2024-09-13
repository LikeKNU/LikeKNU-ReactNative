import CafeteriasSelector from '@/app/meal/components/CafeteriasSelector';
import MealView from '@/app/meal/components/MealView';
import MealBannerAd from '@/common/ads/MealBannerAd';
import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import { useCampus } from '@/common/contexts/CampusContext';
import { useFavoriteCafeteria } from '@/common/contexts/FavoriteContext';
import FontText from '@/common/text/FontText';
import { campusName } from '@/constants/campus';
import { cafeterias, Cafeterias } from '@/constants/meal';
import { sortPinElementTop } from '@/utils/data';
import analytics from '@react-native-firebase/analytics';
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
    const selectCafeteria = cafeteriaList[activeIndex];
    if (campus && selectCafeteria) {
      analytics().logSelectContent({
        content_type: 'cafeteria',
        item_id: `${campusName[campus].name} ${selectCafeteria}`
      });
    }
  }, [activeIndex]);

  const changeCafeteria = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <PageLayout edges={['top']}>
      <TabHeader>
        <FontText fontWeight="700" style={styles.title}>식단</FontText>
      </TabHeader>
      <MealBannerAd />
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
        {cafeteriaList.map(cafeteria => (
          <View key={cafeteria} style={styles.page}>
            <MealView cafeteria={cafeteria}
                      favoriteCafeteria={favoriteCafeteria}
                      handleChangeFavorite={changeFavoriteCafeteria}
                      isActive={cafeteria === cafeteriaList[activeIndex]}
            />
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
