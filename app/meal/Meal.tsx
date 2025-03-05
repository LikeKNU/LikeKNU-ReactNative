import { useCafeterias } from '@/api/meal';
import CafeteriasSelector from '@/app/meal/components/CafeteriasSelector';
import MealView from '@/app/meal/components/MealView';
import PinAngleIcon from '@/assets/icons/pin-angle.svg';
import MealBannerAd from '@/common/ads/MealBannerAd';
import AnimatedPressable from '@/common/components/AnimatedPressable';
import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import TabTitle from '@/common/components/TabTitle';
import { useCampus } from '@/common/contexts/CampusContext';
import { useFavoriteCafeteria } from '@/common/contexts/FavoriteContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import { campusName } from '@/constants/campus';
import colors from '@/constants/colors';
import { CafeteriaProps } from '@/types/mealTypes';
import { sortPinElementTop } from '@/utils/data';
import analytics from '@react-native-firebase/analytics';
import React, { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel/src/components/Carousel';

const Meal = () => {
  const { theme } = useTheme();
  const { campus } = useCampus();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [cafeteriaList, setCafeteriaList] = useState<CafeteriaProps[]>([]);
  const { favoriteCafeteria, changeFavoriteCafeteria } = useFavoriteCafeteria();
  const { data: cafeterias } = useCafeterias();
  const { width: screenWidth } = useWindowDimensions();
  const carouselRef = React.useRef<ICarouselInstance>(null);

  useEffect(() => {
    setActiveIndex(0);

    if (campus && cafeterias) {
      setCafeteriaList(favoriteCafeteria ? sortPinElementTop<CafeteriaProps>(cafeterias, cafeteria => cafeteria.cafeteriaId === favoriteCafeteria)
        : cafeterias);
    }
  }, [favoriteCafeteria, campus, cafeterias]);

  useEffect(() => {
    carouselRef.current?.scrollTo({ index: activeIndex, animated: true });
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
        <TabTitle title="식단" />
      </TabHeader>
      <MealBannerAd />
      <View style={styles.header}>
        {cafeteriaList && cafeteriaList.length > 0 &&
          <>
            <CafeteriasSelector
              cafeteriaList={cafeteriaList}
              activeIndex={activeIndex}
              handleOnPress={changeCafeteria}
            />
            <AnimatedPressable style={{ padding: 4 }} animatedViewStyle={{ borderRadius: 8 }}
                               onPress={() => changeFavoriteCafeteria(cafeteriaList[activeIndex].cafeteriaId)}>
              <PinAngleIcon width={26} height={26}
                            fill={favoriteCafeteria === cafeteriaList[activeIndex].cafeteriaId ? colors.light.red : colors[theme].gray200} />
            </AnimatedPressable>
          </>
        }
      </View>
      <Carousel
        ref={carouselRef}
        width={screenWidth}
        containerStyle={{ flex: 1 }}
        loop={false}
        data={cafeteriaList}
        renderItem={({ item: cafeteria, index }) =>
          <View key={cafeteria.cafeteriaId} style={styles.page}>
            <MealView cafeteria={cafeteria} isActive={index === activeIndex} />
          </View>
        }
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </PageLayout>
  );
};

export default Meal;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  page: {
    alignItems: 'center',
    paddingHorizontal: 20
  }
});
