import CheckIcon from '@/assets/icons/check.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { themeName, Themes } from '@/constants/theme';
import { FlatList, Pressable, StyleSheet } from 'react-native';

const ThemeSetting = () => {
  const { userTheme, changeUserTheme, theme: selectedTheme } = useTheme();

  const ThemeButton = ({ theme }: { theme: Themes }) => {
    return <Pressable
      style={styles.button}
      onPress={() => changeUserTheme(theme)}
    >
      <FontText fontWeight="500" style={{ fontSize: 18 }}>{themeName[theme]}</FontText>
      <CheckIcon width={24} height={24} fill={isSelected(theme) ? colors[selectedTheme].blue : 'none'} />
    </Pressable>
  };

  const isSelected = (theme: Themes) => {
    return userTheme === theme;
  };

  return (
    <FlatList
      contentContainerStyle={styles.buttonContainer}
      data={Object.values(Themes)}
      renderItem={({ item }) => <ThemeButton theme={item} />}
      scrollEnabled={false}
    />
  );
};

export default ThemeSetting;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
