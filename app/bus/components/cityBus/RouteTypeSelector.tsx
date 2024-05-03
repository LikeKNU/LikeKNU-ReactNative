import TagButton from '@/common/components/TagButton';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import { routeType } from '@/constants/bus';
import colors from '@/constants/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface RouteTypeProps {
  activeIndex: number;
  handleOnPress: (index: number) => void;
}

const RouteTypeSelector = ({ activeIndex, handleOnPress }: RouteTypeProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {Object.values(routeType).map((routeType, index) =>
        <TagButton
          key={routeType.value}
          isActive={activeIndex === index}
          handleOnPress={() => handleOnPress(index)}
        >
          <FontText fontWeight="600" style={[styles.routeTypeName, {
            color: activeIndex === index ? 'white' : colors[theme].contrast
          }]}>{routeType.name}</FontText>
        </TagButton>
      )}
    </View>
  );
};

export default RouteTypeSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  routeTypeName: {
    fontSize: 16
  }
});
