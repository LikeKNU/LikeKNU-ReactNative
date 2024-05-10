import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import XCircleIcon from '@/assets/icons/x-circle.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

interface SearchHeaderProps {
  handleSubmit: (keyword: string) => void
}

const SearchHeader = ({ handleSubmit }: SearchHeaderProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');
  const [isFillText, setIsFillText] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const handleChangeText = (text: string) => {
    if (text.length > 0) {
      setIsFillText(true);
    } else {
      setIsFillText(false);
    }
    setKeyword(text);
  };

  const clearText = () => {
    setKeyword('');
    setIsFillText(false);
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <View style={styles.backIcon}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeftIcon width={24} height={24} fill={colors[theme].contrast} />
        </Pressable>
      </View>
      <TextInput
        ref={inputRef}
        style={[styles.textInput, { backgroundColor: colors[theme].container, color: colors[theme].contrast }]}
        placeholderTextColor={colors[theme].gray200}
        onChangeText={handleChangeText}
        value={keyword}
        placeholder="검색어를 입력하세요"
        keyboardAppearance={theme}
        allowFontScaling={false}
        returnKeyType={'search'}
        onSubmitEditing={() => handleSubmit(keyword)}
        autoFocus={true}
      />
      {isFillText && <Pressable style={{ paddingHorizontal: 4 }} onPress={clearText}>
        <XCircleIcon width={22} height={22} fill={colors[theme].gray200} />
      </Pressable>}
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 16,
    paddingHorizontal: 10
  },
  backIcon: {
    flexDirection: 'row'
  },
  textInput: {
    flex: 10,
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 20
  }
});
