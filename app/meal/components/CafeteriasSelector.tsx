import { useTheme } from '@/common/components/ThemeContext';
import useCampus from '@/common/hooks/useCampus';
import FontText from '@/common/text/FontText';
import colors, { campusColors } from '@/constants/colors';
import { Cafeterias } from '@/constants/meal';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface CafeteriasItemProps {
  cafeteriaList: Cafeterias[],
  activeIndex: number,
  handleOnPress: (index: number) => void;
}

const CafeteriasSelector = ({ cafeteriaList, activeIndex, handleOnPress }: CafeteriasItemProps) => {
  const { theme } = useTheme();
  const { campus } = useCampus();

  return (
    <View style={styles.container}>
      {cafeteriaList.map((cafeteria, index) =>
        <Pressable
          key={cafeteria}
          style={[styles.cafeteriaButton, {
            backgroundColor: activeIndex === index ? campusColors[campus!] : colors[theme].gray300,
            shadowColor: colors[theme].background,
          }]}
          onPress={() => handleOnPress(index)}
        >
          <FontText fontWeight="600" style={[styles.cafeteriaName, {
            color: activeIndex === index ? colors[theme].gray300 : colors[theme].contrast
          }]}>{cafeteria}</FontText>
        </Pressable>
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
  cafeteriaButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,

    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 2, height: 2 },

    alignItems: 'center',
    marginRight: 10
  },
  cafeteriaName: {
    fontSize: 16
  }
});
