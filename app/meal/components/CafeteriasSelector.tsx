import TagButton from '@/common/components/TagButton';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { CafeteriaProps } from '@/types/mealTypes';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export interface CafeteriasItemProps {
  cafeteriaList: CafeteriaProps[];
  activeIndex: number;
  handleOnPress: (index: number) => void;
}

const CafeteriasSelector = ({ cafeteriaList, activeIndex, handleOnPress }: CafeteriasItemProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <FlatList
        data={cafeteriaList}
        contentContainerStyle={{ paddingVertical: 6 }}
        renderItem={({ item: cafeteria, index }) =>
          <TagButton
            key={cafeteria.cafeteriaId}
            isActive={activeIndex === index}
            handleOnPress={() => handleOnPress(index)}
          >
            <FontText fontWeight="600" style={[styles.cafeteriaName, {
              color: activeIndex === index ? 'white' : colors[theme].contrast
            }]}>{cafeteria.cafeteriaName}</FontText>
          </TagButton>
        }
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />
    </View>
  );
};

export default CafeteriasSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1
  },
  cafeteriaName: {
    fontSize: 16
  }
});
