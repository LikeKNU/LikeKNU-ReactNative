import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

interface CardContainerProps extends ViewProps {
  title: string;
  style?: ViewStyle;
}

const CardContainer = ({ children, title, style, ...props }: CardContainerProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors[theme].container }, style]} {...props}>
      <FontText fontWeight="800" style={[styles.title, { color: colors[theme].text }]}>{title}</FontText>
    </View>
  );
};

export default CardContainer;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 24
  }
});
