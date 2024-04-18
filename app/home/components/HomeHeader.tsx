import CampusSelector from '@/app/home/components/CampusSelector';
import { useTheme } from '@/common/components/ThemeContext';
import { StyleSheet, View } from 'react-native';

const HomeHeader = () => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <CampusSelector />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 10
  },
  content: {
    fontSize: 22
  }
});
