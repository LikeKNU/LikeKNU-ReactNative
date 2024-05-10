import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { HomeMealProps } from '@/types/homeType';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

const HomeMealItem = ({ meal }: { meal: HomeMealProps }) => {
  const { theme } = useTheme();
  const router = useRouter();

  const maxWordsToShow = 7;
  const words = meal.menus ? meal.menus.split(' ') : [];
  const displayedMenus = words.length > maxWordsToShow
    ? [...words.slice(0, maxWordsToShow), '...']
    : words;

  return (
    <Pressable
      style={{ height: 176 }}
      key={meal.cafeteriaId}
      onPress={() => router.navigate({ pathname: '/meal', params: { cafeteriaName: meal.cafeteriaName } })}
    >
      <View style={styles.titleContainer}>
        <FontText fontWeight="700" style={styles.title}>{meal.cafeteriaName}</FontText>
        <FontText fontWeight="700" style={[styles.subtitle, { color: colors[theme].gray200 }]}>
          {meal.mealType}
        </FontText>
      </View>
      {displayedMenus.length > 0 ? (
        <FlatList
          scrollEnabled={false}
          data={displayedMenus}
          renderItem={({ item }) =>
            <FontText fontWeight="500" style={styles.menus} numberOfLines={1}>{item}</FontText>
          }
          keyExtractor={(item) => item}
        />
      ) : <FontText style={[styles.emptyMessage, { color: colors[theme].gray100 }]} numberOfLines={1}>
        등록된 메뉴가 없어요
      </FontText>}
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
