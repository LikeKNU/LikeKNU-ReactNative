import { sendSuggestion } from '@/api/suggestion';
import MailIcon from '@/assets/icons/mail.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useDeviceId } from '@/utils/device';
import { useRef, useState } from 'react';
import { Alert, Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';
import Toast from 'react-native-root-toast';

interface SuggestionItemProps {
  changeVisible: (visible: boolean) => void;
}

const SuggestionItem = ({ changeVisible }: SuggestionItemProps) => {
  const { theme } = useTheme();
  const { deviceId } = useDeviceId();
  const [content, setContent] = useState<string>('');
  const [isFillText, setIsFillText] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const buttonOpacity = isFillText || keyboardVisible ? 1 : 0.5;

  const createClearAlert = () => {
    Alert.alert('', '작성한 내용을 모두 지우시겠어요?', [
      {
        text: '아니요!',
        style: 'cancel'
      },
      {
        text: '지울게요!',
        onPress: handleClear,
        style: 'destructive'
      }
    ]);
  };

  const createSubmitAlert = () => {
    Alert.alert('', '개발자에게 편지를 보낼까요? ✉️', [
      {
        text: '아니요!',
        style: 'cancel'
      },
      {
        text: '보낼게요!',
        onPress: handleSubmit
      }
    ]);
  };

  const handleOnFocus = () => {
    changeVisible(false);
    setKeyboardVisible(true);
  };

  const handleOnEndEditing = () => {
    changeVisible(true);
    setKeyboardVisible(false);
  };

  const handleChangeText = (text: string) => {
    if (text.trim().length > 0) {
      setIsFillText(true);
    } else {
      setIsFillText(false);
    }

    if (text.length > 500) {
      return;
    }
    setContent(text);
  };

  const handleClear = () => {
    setContent('');
    setIsFillText(false);
    inputRef.current?.clear();
  };

  const handleSubmit = () => {
    if (deviceId) {
      sendSuggestion(deviceId, content);
    }

    Toast.show('개발자에게 잘 전달했어요! 😊', {
      duration: Toast.durations.LONG,
      backgroundColor: colors[theme].gray300,
      textColor: colors[theme].contrast,
      containerStyle: {
        borderRadius: 8,
        marginBottom: 40
      },
    });

    setContent('');
    setIsFillText(false);
    inputRef.current?.clear();
  };

  return (
    <View style={styles.container}>
      <View style={styles.title} onTouchStart={Keyboard.dismiss}>
        <FontText fontWeight="600" style={{ fontSize: 16, marginRight: 4 }}>To. 개발자에게</FontText>
        <MailIcon />
      </View>
      <View style={{ alignItems: 'center' }} onTouchStart={Keyboard.dismiss}>
        <FontText style={{ color: colors[theme].gray100, marginBottom: 10 }}>아래의 내용들을 개발자에게 자유롭게 알려주세요!</FontText>
        <FontText>사용하면서 불편했던 부분</FontText>
        <FontText>잘못된 정보</FontText>
        <FontText>새로 추가되었으면 하는 기능</FontText>
        <FontText>사용하면서 편했던 부분</FontText>
      </View>
      <TextInput
        ref={inputRef}
        style={[styles.input, { backgroundColor: colors[theme].gray300, color: colors[theme].contrast }]}
        multiline={true}
        placeholder="학식 메뉴 확인하기 너무 편해요!"
        placeholderTextColor={colors[theme].gray100}
        keyboardAppearance={theme}
        allowFontScaling={false}
        onFocus={handleOnFocus}
        onEndEditing={handleOnEndEditing}
        onChangeText={handleChangeText}
        textAlignVertical={'top'}
        numberOfLines={5}
        maxLength={500}
      />
      <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
        {!keyboardVisible && <Pressable
          style={[styles.button, { backgroundColor: colors[theme].gray300, opacity: buttonOpacity, marginRight: 5 }]}
          onPress={createClearAlert}
          disabled={!isFillText}
        >
          <FontText fontWeight="600">지우기</FontText>
        </Pressable>}
        <Pressable
          style={[styles.button, { backgroundColor: colors[theme].blue, opacity: buttonOpacity, marginLeft: 5 }]}
          onPress={keyboardVisible ? Keyboard.dismiss : createSubmitAlert}
          disabled={!isFillText && !keyboardVisible}
        >
          <FontText fontWeight="600" style={{ color: 'white' }}>{keyboardVisible ? '완료' : '보내기'}</FontText>
        </Pressable>
      </View>
    </View>
  );
};

export default SuggestionItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    borderRadius: 18,
    alignItems: 'center'
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    height: 98,
    borderRadius: 12,
    padding: 10,
    marginTop: 10
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8
  }
});
