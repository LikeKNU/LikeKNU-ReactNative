import BusFrontIcon from '@/assets/icons/bus-front.svg';
import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors, { campusColors } from '@/constants/colors';
import { BusArrivalProps } from '@/types/busTypes';
import { hexToRgba } from '@/utils/color';
import { calculateTimeRemaining } from '@/utils/date';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import AnimatedValue = Animated.AnimatedValue;

interface BusArrivalTimeListItemProps {
  arrivalBus: BusArrivalProps;
  isNext: boolean;
}

const BusArrivalTimeListItem = ({ arrivalBus, isNext }: BusArrivalTimeListItemProps) => {
  const { theme } = useTheme();
  const { campus } = useCampus();
  const animatedBackgroundOpacity = useRef<AnimatedValue>(new Animated.Value(0)).current;

  useEffect(() => {
    if (isNext) {
      const animation = Animated.sequence([
        Animated.timing(animatedBackgroundOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedBackgroundOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]);

      const loopAnimation = Animated.loop(animation, { iterations: 2 });
      loopAnimation.start();

      return () => loopAnimation.stop();
    }
  }, [isNext, animatedBackgroundOpacity]);

  const backgroundColor = animatedBackgroundOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', hexToRgba(campusColors[campus!], 0.2)],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderBottomColor: colors[theme].gray300,
          backgroundColor: isNext ? (backgroundColor as any) : 'transparent',
        },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <BusFrontIcon
          width={22}
          height={22}
          fill={`#${arrivalBus.busColor}`}
          opacity={theme === 'dark' ? 0.9 : 1}
        />
        <FontText fontWeight="700" style={styles.busNumber}>
          {arrivalBus.busNumber}
        </FontText>
        <FontText style={styles.arrivalTime}>{arrivalBus.arrivalAt?.slice(0, -3)}</FontText>
        <FontText style={[styles.remainingTime, { color: colors[theme].gray100 }]}>
          {calculateTimeRemaining(arrivalBus.arrivalAt!)}
        </FontText>
      </View>
      {isNext && (
        <FontText fontWeight="600" style={{ color: colors[theme].blue }}>
          다음 버스
        </FontText>
      )}
    </Animated.View>
  );
};

export default BusArrivalTimeListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 20
  },
  busNumber: {
    fontSize: 16,
    width: 52,
    marginLeft: 2
  },
  arrivalTime: {
    marginLeft: 6
  },
  remainingTime: {
    marginLeft: 8
  }
});
