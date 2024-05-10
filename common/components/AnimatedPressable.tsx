import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import { PropsWithChildren, useRef } from 'react';
import { Animated, Pressable, ViewStyle } from 'react-native';

interface AnimatedPressableProps extends PropsWithChildren {
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  animatedViewStyle?: ViewStyle;
}

const AnimatedPressable = ({ onPress, style, animatedViewStyle, children }: AnimatedPressableProps) => {
  const { theme } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale }],
    backgroundColor: scale.interpolate({
      inputRange: [0.95, 1],
      outputRange: [colors[theme].press, colors[theme].container]
    })
  };

  return (
    <Animated.View style={[animatedStyle, animatedViewStyle]}>
      <Pressable style={style}
                 onPress={onPress}
                 onPressIn={handlePressIn}
                 onPressOut={handlePressOut}>
        {children}
      </Pressable>
    </Animated.View>
  );
};

export default AnimatedPressable;

