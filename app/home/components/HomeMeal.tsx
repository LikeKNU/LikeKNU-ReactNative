import { useHomeMeal } from '@/api/home';
import HomeMealItem from '@/app/home/components/HomeMealItem';
import SwiperComponent from '@/app/home/components/SwiperComponent';
import CardContainer from '@/common/components/CardContainer';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const HomeMeal = () => {
  const { data, isLoading, error } = useHomeMeal();
  const router = useRouter();

  return (
    <View style={{ flex: 1, marginRight: 5 }}>
      <CardContainer title={<View />}>
        {!isLoading &&
          <SwiperComponent>
            {data && data.map((meal) => (
              <HomeMealItem meal={meal} key={meal.cafeteriaId} />
            ))}
          </SwiperComponent>
        }
      </CardContainer>
    </View>
  );
};

export default HomeMeal;
