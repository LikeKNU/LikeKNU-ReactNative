import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';

const BottomSheetExample = () => {
  const { theme } = useTheme();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModalProvider>
      <View
        style={[styles.container, { backgroundColor: colors[theme].container }]}
        onTouchStart={() => bottomSheetRef.current?.close()}
      >
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color={colors[theme].gray100}
        />
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{ backgroundColor: colors[theme].container }}
          handleIndicatorStyle={{ backgroundColor: colors[theme].gray100 }}
        >
          <BottomSheetView
            style={[styles.contentContainer]}
          >
            <FontText style={{ color: colors[theme].contrast }}>Awesome 🎉</FontText>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default BottomSheetExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  }
});
