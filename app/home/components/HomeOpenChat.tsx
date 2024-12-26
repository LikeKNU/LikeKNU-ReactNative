import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import ChatDotsIcon from '@/assets/icons/chat-dots.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import React from 'react';
import { Image, Linking, Pressable, StyleSheet, View } from 'react-native';

const HomeOpenChat = () => {
  const { theme } = useTheme();

  return (
    <Pressable style={[styles.container, { backgroundColor: colors.christmasGreen100, flex: 1 }]}
               onPress={() => Linking.openURL('https://open.kakao.com/o/stp3zoyg')}>
      <View style={styles.box}>
        <View style={styles.titleContainer}>
          <ChatDotsIcon width={24} height={24} />
          <FontText fontWeight="700" style={[styles.title, {color: colors.dark.contrast}]}>문의/요청</FontText>
        </View>
        <ArrowRightIcon />
      </View>
      <Image source={require('@/assets/icons/christmas-sock.png')}
             style={{ width: 38, height: 38, position: 'absolute', bottom: -6, right: 11, transform: [{rotate: '-20deg'}]}} />
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
