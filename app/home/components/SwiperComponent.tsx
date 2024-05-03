import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import colors, { campusColors } from '@/constants/colors';
import React, { PropsWithChildren } from 'react';
import Swiper from 'react-native-swiper';

const SwiperComponent = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();
  const { campus } = useCampus();

  return (
    <Swiper
      index={0}
      showsButtons={false}
      activeDotColor={campus ? campusColors[campus] : colors[theme].contrast}
      dotStyle={{ marginBottom: -20 }}
      dotColor={colors[theme].gray300}
      activeDotStyle={{ marginBottom: -20 }}
    >
      {children}
    </Swiper>
  );
}

export default SwiperComponent;

// AppRegistry.registerComponent('like-knu', () => SwiperComponent);
