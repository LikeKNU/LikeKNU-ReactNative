import ChatDotsIcon from '@/assets/icons/chat-dots.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import React from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';

const HomeOpenChat = () => {
  const { theme } = useTheme();

  return (
    <Pressable style={[styles.container, { backgroundColor: colors[theme].container }]}
               onPress={() => Linking.openURL('https://open.kakao.com/o/stp3zoyg')}>
      <View style={styles.box}>
        <ChatDotsIcon width={28} height={28} />
        <FontText fontWeight="600" style={styles.title}>문의/요청</FontText>
      </View>
    </Pressable>
  );
};

export default HomeOpenChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 82,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginBottom: 10
  },
  box: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4
  },
  title: {
    fontSize: 14
  }
});
