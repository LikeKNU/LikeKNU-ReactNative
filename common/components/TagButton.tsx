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
        shadowColor: colors[theme].gray300,
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center'
  }
});
