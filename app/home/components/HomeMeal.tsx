import { useHomeMeal } from '@/api/home';
import HomeMealItem from '@/app/home/components/HomeMealItem';
import CardContainer from '@/common/components/CardContainer';
import { useTheme } from '@/common/components/ThemeContext';
import useCampus from '@/common/hooks/useCampus';
import colors, { campusColors } from '@/constants/colors';
import React from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';

const HomeMeal = () => {
  const { theme } = useTheme();
  const { campus } = useCampus();
  const { data, isLoading, error } = useHomeMeal();

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
            {data ? data.map((meal) => <HomeMealItem meal={meal} key={meal.cafeteriaId} />)
              : <View></View>}
          </Swiper>
        }
      </CardContainer>
    </View>
  );
};

export default HomeMeal;
