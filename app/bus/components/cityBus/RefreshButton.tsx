import ArrowClockwiseIcon from '@/assets/icons/arrow-clockwise.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { usePathname } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, ViewStyle } from 'react-native';

interface BusRefreshProps {
  mutate: any;
  focusPathname: string;
  style?: ViewStyle;
}

const RefreshButton = ({ mutate, focusPathname, style }: BusRefreshProps) => {
  const intervalTime = 30;
  const { theme } = useTheme();
  const [refreshTime, setRefreshTime] = useState(intervalTime);
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshTime(prevState => {
        if (prevState === 0) {
          handleRefresh();
          return 0;
        }

        return prevState - 1;
      });
    }, 1000);

    if (pathname !== focusPathname) {
      clearInterval(timer);
      animationRef.current?.stop();
      setRefreshTime(intervalTime);
      return;
    }

    mutate();

    return () => {
      clearInterval(timer);
      animationRef.current?.stop();
    };
  }, [pathname]);

  const handleRefresh = () => {
    animationRef.current = Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
      })
    );
    animationRef.current.start();

    mutate().then(() => {
      setTimeout(() => {
        animationRef.current?.stop();
        rotateAnimation.setValue(0);
        setRefreshTime(intervalTime);
      }, 700);
    });
  };

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors[theme].gray300 }, style]}
      onPress={handleRefresh}
    >
      <Animated.View style={{ transform: [{ rotate }] }}>
        <ArrowClockwiseIcon width={36} height={36} fill={colors[theme].gray200} />
      </Animated.View>
      <FontText fontWeight="600" style={[styles.refreshTime, { color: colors[theme].gray100 }]}>{refreshTime}</FontText>
    </Pressable>
  );
};

export default RefreshButton;

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,

    alignItems: 'center',
    justifyContent: 'center'
  },
  refreshTime: {
    position: 'absolute',
    fontSize: 12,
    paddingLeft: 1,
    paddingTop: 1
  }
});
