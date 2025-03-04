import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface BackHeaderProps {
  title?: string | ReactNode;
  button?: ReactNode;
  onPress?: () => void;
}

const BackHeader = ({ title, button, onPress }: BackHeaderProps) => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.backIcon}>
        <Pressable style={styles.backPressable} onPress={onPress || (() => {
          if (router.canGoBack()) {
            router.back();
            return;
          }
          router.replace('/');
        })}>
          <ArrowLeftIcon width={24} height={24} fill={colors[theme].gray100} />
        </Pressable>
      </View>
      {
        typeof title === 'string' ?
          <FontText fontWeight="600"
                    style={[styles.title, { color: colors[theme].contrast }]}>{title}</FontText> :
          title
      }
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
        {button}
        <View style={{ width: 10 }}></View>
      </View>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 16,
    paddingHorizontal: 10
  },
  title: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center'
  },
  backPressable: {
    paddingVertical: 2,
    paddingRight: 20
  },
  backIcon: {
    flex: 1,
    flexDirection: 'row'
  }
});
