import XMarkIcon from '@/assets/icons/xmark.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

const CloseButton = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Pressable
      style={styles.container}
      onPress={() => router.canGoBack() ? router.back() : router.replace('/')}
    >
      <XMarkIcon width={22} height={22} fill={colors[theme].gray200} />
    </Pressable>
  );
};

export default CloseButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 2,
    paddingVertical: 6
  }
});
