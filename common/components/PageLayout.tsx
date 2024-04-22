import { useTheme } from '@/common/components/ThemeContext';
import colors from '@/constants/colors';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaViewProps } from 'react-native-safe-area-context/src/SafeAreaView';

interface DefaultContainerProps extends SafeAreaViewProps {
  style?: ViewStyle;
}

const PageLayout = ({ children, style, ...props }: DefaultContainerProps) => {
  const { theme } = useTheme();
  const { top } = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      flexDirection: 'column',
      paddingTop: top,

      backgroundColor: colors[theme].container
    }
  });

  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};

export default PageLayout;
