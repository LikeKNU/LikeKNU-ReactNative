import { useShuttleRoutes } from '@/api/bus';
import ShuttleBusView from '@/app/bus/components/shuttleBus/ShuttleBusView';
import ShuttleRouteListItem from '@/app/bus/components/shuttleBus/ShuttleRouteListItem';
import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

const ShuttleBus = () => {
  const { theme } = useTheme();
  const { data, isLoading, mutate } = useShuttleRoutes();
  const snapPoints = useMemo(() => ['70%'], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [shuttleId, setShuttleId] = useState<string>('');

  const handleOnPress = (shuttleId: string) => {
    setShuttleId(shuttleId);
    bottomSheetRef.current?.present();
  };

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.5}
    />
  ), []);

  return (
    <BottomSheetModalProvider>
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        renderItem={({ item }) => <ShuttleRouteListItem shuttleRoute={item} onPress={handleOnPress} />}
        keyExtractor={item => item.shuttleId}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={mutate}
          />
        }
      />
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: colors[theme].container }}
        handleIndicatorStyle={{ backgroundColor: colors[theme].gray200 }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.contentContainer}>
          <ShuttleBusView shuttleId={shuttleId} />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default ShuttleBus;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40
  }
});
