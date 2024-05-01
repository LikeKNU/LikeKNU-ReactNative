import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import { PropsWithChildren, useRef } from 'react';
import { Animated, Pressable, StyleSheet, ViewStyle } from 'react-native';

interface AnimatedButtonProps extends PropsWithChildren {
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  animatedViewStyle?: ViewStyle;
}

const AnimatedButton = ({ onPress, style, animatedViewStyle, children }: AnimatedButtonProps) => {
  const { theme } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
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
    transform: [{ scale }]
  };

  return (
    <Animated.View style={[animatedStyle, animatedViewStyle]}>
      <Pressable
        style={[styles.buttonContainer, { backgroundColor: colors[theme].gray300 }, style]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,


  }
});
