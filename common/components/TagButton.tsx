import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import colors, { campusColors } from '@/constants/colors';
import { Cafeterias } from '@/constants/meal';
import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet } from 'react-native';

export interface TagButtonProps extends PropsWithChildren {
  isActive: boolean;
  active?: Cafeterias | undefined;
  handleOnPress: (...args: any) => void;
}

const TagButton = ({ children, isActive, handleOnPress }: TagButtonProps) => {
  const { theme } = useTheme();
  const { campus } = useCampus();

  return (
    <Pressable
      style={[styles.container, {
        backgroundColor: isActive ? campusColors[campus!] : colors[theme].gray300,
        shadowColor: colors[theme].shadow
      }]}
      onPress={handleOnPress}
    >
      {children}
    </Pressable>
  );
};

export default TagButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,

    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },

    alignItems: 'center',
    marginRight: 10
  }
});
