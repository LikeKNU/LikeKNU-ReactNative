import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface HeaderProps {
  title?: string | ReactNode;
  button?: ReactNode;
}

const CloseHeader = ({ title, button }: HeaderProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.ghost} />
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

export default CloseHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 6
  },
  title: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center'
  },
  ghost: {
    flex: 1,
    flexDirection: 'row'
  }
});
