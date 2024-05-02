import TagButton from '@/common/components/TagButton';
import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { Cafeterias } from '@/constants/meal';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface CafeteriasItemProps {
  cafeteriaList: Cafeterias[];
  activeIndex: number;
  handleOnPress: (index: number) => void;
}

const CafeteriasSelector = ({ cafeteriaList, activeIndex, handleOnPress }: CafeteriasItemProps) => {
  const { theme } = useTheme();
  const { campus } = useCampus();

  return (
    <View style={styles.container}>
      {cafeteriaList.map((cafeteria, index) =>
        <TagButton
          key={cafeteria}
          isActive={activeIndex === index}
          handleOnPress={() => handleOnPress(index)}
        >
          <FontText fontWeight="600" style={[styles.cafeteriaName, {
            color: activeIndex === index ? 'white' : colors[theme].contrast
          }]}>{cafeteria}</FontText>
        </TagButton>
      )}
    </View>
  );
};

export default CafeteriasSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  cafeteriaName: {
    fontSize: 16
  }
});
