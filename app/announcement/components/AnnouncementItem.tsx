import DotIcon from '@/assets/icons/dot.svg';
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { getCurrentDate } from '@/utils/date';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

export interface ListItemProps {
  subtitle: string;
  date: string;
  body: string;
  url: string | null;
}

const AnnouncementItem = ({ subtitle, date, body, url }: ListItemProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;
  const isToday = date === getCurrentDate();

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
    }),
    borderRadius: 12,
    paddingHorizontal: 20
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable style={[styles.container, { borderBottomColor: colors[theme].gray300 }]}
                 onPress={() => router.push({
                   pathname: '/announcement/details',
                   params: { url: url }
                 })}
                 onPressIn={handlePressIn}
                 onPressOut={handlePressOut}>
        <FontText fontWeight="500" style={[{ color: colors[theme].text }, styles.body]}>{body}</FontText>
        <View style={styles.additionalContainer}>
          <FontText style={[{ color: colors[theme].gray100 }, styles.additional]}>{subtitle + ' | ' + date}</FontText>
          {isToday && <DotIcon fill={colors.red} width={12} height={12} />}
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default AnnouncementItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderBottomWidth: 0.5
  },
  additional: {
    flexDirection: 'row',
    alignItems: 'center',

    fontSize: 13
  },
  body: {
    fontSize: 15
  },
  additionalContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingTop: 4
  }
});
