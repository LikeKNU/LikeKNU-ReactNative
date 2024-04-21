import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { HomeMealProps } from '@/types/homeType';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const HomeMealItem = ({ meal }: { meal: HomeMealProps }) => {
  const { theme } = useTheme();
  const router = useRouter();

  const maxWordsToShow = 7;
  const words = meal.menus ? meal.menus.split(' ') : [];
  const displayedMenus = words.length > maxWordsToShow
    ? words.slice(0, maxWordsToShow).join('\n') + '\n...'
    : words.join('\n');

  return (
    <Pressable onPress={() => router.navigate({ pathname: '/meal', params: { cafeteriaId: meal.cafeteriaId } })}>
      <View key={meal.cafeteriaId}>
        <View style={styles.titleContainer}>
          <FontText fontWeight="700" style={styles.title}>{meal.cafeteriaName}</FontText>
          <FontText fontWeight="700" style={[styles.subtitle, { color: colors[theme].gray200 }]}>
            {meal.mealType}
          </FontText>
        </View>
        {displayedMenus ? (
          <FontText fontWeight="500" style={styles.menus}>
            {displayedMenus}
          </FontText>
        ) : <FontText fontWeight="400" style={[styles.emptyMessage, { color: colors[theme].gray200 }]}>
          등록된 메뉴가 없어요
        </FontText>}
      </View>
    </Pressable>
  );
};

export default HomeMealItem;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  title: {
    fontSize: 18
  },
  subtitle: {
    fontSize: 12,
    marginRight: 4
  },
  menus: {
    fontSize: 12,
    lineHeight: 18
  },
  emptyMessage: {
    fontSize: 12
  }
});
