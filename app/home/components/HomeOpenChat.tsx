import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import ChatDotsIcon from '@/assets/icons/chat-dots.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';

const HomeOpenChat = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Pressable style={[styles.container, { backgroundColor: colors[theme].container, flex: 1 }]}
               onPress={() => Linking.openURL('https://open.kakao.com/o/gep73mTg')}>
      <View style={styles.box}>
        <View style={styles.titleContainer}>
          <ChatDotsIcon width={24} height={24} />
          <FontText fontWeight="700" style={styles.title}>오픈채팅방</FontText>
        </View>
        <ArrowRightIcon />
      </View>
    </Pressable>
  );
};

export default HomeOpenChat;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 10
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleContainer: {
    flexDirection: 'row', alignItems: 'center',
    gap: 4
  },
  title: {
    fontSize: 18
  }
});
