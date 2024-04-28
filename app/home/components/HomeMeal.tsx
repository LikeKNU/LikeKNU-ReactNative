import { useHomeMeal } from '@/api/home';
import HomeMealItem from '@/app/home/components/HomeMealItem';
import CardContainer from '@/common/components/CardContainer';
import { useTheme } from '@/common/components/ThemeContext';
import useCampus from '@/common/hooks/useCampus';
import useFavoriteCafeteria from '@/common/hooks/useFavoriteCafeteria';
import colors, { campusColors } from '@/constants/colors';
import { HomeMealProps } from '@/types/homeType';
import { sortPinElementTop } from '@/utils/data';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';

const HomeMeal = () => {
  const { theme } = useTheme();
  const { campus } = useCampus();
  const { data, isLoading, error } = useHomeMeal();
  const [meals, setMeals] = useState<HomeMealProps[]>([]);
  const { favoriteCafeteria } = useFavoriteCafeteria();

  useEffect(() => {
    if (data) {
      favoriteCafeteria ? setMeals(sortPinElementTop(data, meal => meal.cafeteriaName === favoriteCafeteria))
        : setMeals(data);
    }
  }, [data, favoriteCafeteria]);

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
