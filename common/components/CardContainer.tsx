import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { ReactNode } from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

interface CardContainerProps extends ViewProps {
  title: string | ReactNode;
  style?: ViewStyle;
}

const CardContainer = ({ children, title, style, ...props }: CardContainerProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors[theme].container }, style]} {...props}>
      {typeof title === 'string' ? (
        <FontText fontWeight="700" style={styles.title}>{title}</FontText>
      ) : (
        title
      )}
      {children}
    </View>
  );
};

export default CardContainer;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 20,
    minHeight: 130
  },
  title: {
    fontSize: 18,
    marginBottom: 10
  }
});
