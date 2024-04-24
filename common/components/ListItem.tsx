import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

export interface ListItemProps {
  subtitle: string;
  date: string;
  body: string;
  url: string | null;
}

const ListItem = ({ subtitle, date, body, url }: ListItemProps) => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Pressable style={styles.container} onPress={() => router.push({
      pathname: '/announcement/details',
      params: { url: url }
    })}>
      <View style={styles.header}>
        <FontText style={[{ color: colors[theme].gray100 }, styles.subtitle]}>{subtitle}</FontText>
        <FontText style={[{ color: colors[theme].gray100 }, styles.date]}>{date}</FontText>
      </View>
      <FontText style={[{ color: colors[theme].text }, styles.body]}>{body}</FontText>
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  body: {},
  subtitle: {},
  date: {}
});
