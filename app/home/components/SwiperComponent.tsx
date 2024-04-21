import { useTheme } from '@/common/components/ThemeContext';
import useCampus from '@/common/hooks/useCampus';
import colors, { campusColors } from '@/constants/colors';
import React, { PropsWithChildren } from 'react';
import { AppRegistry } from 'react-native';
import Swiper from 'react-native-swiper';

const SwiperComponent = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();
  const { campus } = useCampus();

  return (
    <Swiper
      index={0}
      showsButtons={false}
      activeDotColor={campusColors[campus] || '#000'}
      dotStyle={{ marginBottom: -20 }}
      dotColor={colors[theme].gray300}
      activeDotStyle={{ marginBottom: -20 }}
    >
      {children}
    </Swiper>
  );
}

export default SwiperComponent;

AppRegistry.registerComponent('like-knu', () => SwiperComponent);
