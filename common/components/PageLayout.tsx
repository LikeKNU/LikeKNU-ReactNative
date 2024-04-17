import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaViewProps } from 'react-native-safe-area-context/src/SafeAreaView';

interface DefaultContainerProps extends SafeAreaViewProps {
  style?: ViewStyle;
}

const PageLayout = ({ children, style, ...props }: DefaultContainerProps) => {
  return (
    <SafeAreaView style={[styles.container, style]} {...props}>
      {children}
    </SafeAreaView>
  );
};

export default PageLayout;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'column'
  }
});
