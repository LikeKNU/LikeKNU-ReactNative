import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

const NotificationSetting = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable style={styles.row} onPress={() => router.push('/keyword')}>
        <FontText fontWeight="500" style={[styles.label, { color: colors[theme].contrast }]}>
          키워드 알림
        </FontText>
        <FontText style={[styles.chevron, { color: colors[theme].gray100 }]}>›</FontText>
      </Pressable>
    </View>
  );
};

export default NotificationSetting;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 8
  },
  label: {
    fontSize: 17
  },
  chevron: {
    fontSize: 22
  }
});
