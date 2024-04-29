import { useTheme } from '@/common/contexts/ThemeContext';
import useCampus from '@/common/hooks/useCampus';
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
        shadowColor: colors[theme].background
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
    borderRadius: 14,

    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 2, height: 2 },

    alignItems: 'center',
    marginRight: 10
  }
});
