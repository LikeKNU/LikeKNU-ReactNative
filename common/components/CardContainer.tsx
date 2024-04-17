import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { StyleSheet, View, ViewProps } from 'react-native';

interface CardContainerProps extends ViewProps {
  title: string;
}

const CardContainer = ({ children, title, ...props }: CardContainerProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors[theme].container }]}>
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
