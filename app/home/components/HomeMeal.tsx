import { useHomeMeal } from '@/api/home';
import HomeMealItem from '@/app/home/components/HomeMealItem';
import CardContainer from '@/common/components/CardContainer';
import { useTheme } from '@/common/components/ThemeContext';
import useCampus from '@/common/hooks/useCampus';
import colors, { campusColors } from '@/constants/colors';
import { HomeMealProps } from '@/types/homeType';
import { sortPinElementTop } from '@/utils/data';
import { getData } from '@/utils/storage';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';

const HomeMeal = () => {
  const { theme } = useTheme();
  const { campus } = useCampus();
  const { data, isLoading, error } = useHomeMeal();
  const [meals, setMeals] = useState<HomeMealProps[]>([]);

  const setMealList = async () => {
    const favoriteCafeteria = await getData('favoriteCafeteria');
    if (favoriteCafeteria && data) {
      setMeals(sortPinElementTop(data, meal => meal.cafeteriaName === favoriteCafeteria));
    }
  };

  useEffect(() => {
    setMealList();
  }, [data]);

  return (
    <View style={{ flex: 1, marginRight: 5 }}>
      <CardContainer title={<View />} style={{ height: 232 }}>
        {!isLoading &&
          <Swiper
            index={0}
            showsButtons={false}
            activeDotColor={campus ? campusColors[campus] : colors[theme].contrast}
            dotStyle={{ marginBottom: -20 }}
            dotColor={colors[theme].gray300}
            activeDotStyle={{ marginBottom: -20 }}
          >
            {meals.map((meal) => <HomeMealItem meal={meal} key={meal.cafeteriaId} />)}
          </Swiper>
        }
      </CardContainer>
    </View>
  );
};

export default HomeMeal;
