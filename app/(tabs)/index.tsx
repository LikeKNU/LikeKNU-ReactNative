import FontText from '@/components/text/FontText';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainPage = () => {
  return (
    <SafeAreaView>
      <FontText style={styles.title}>메인</FontText>
    </SafeAreaView>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  title: { fontWeight: '700', fontSize: 32, textAlign: 'center' }
});
