import { useShuttleBuses } from '@/api/bus';
import ShuttleBusItem from '@/app/bus/components/shuttleBus/ShuttleBusItem';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet } from 'react-native';

export interface ShuttleBusViewProps {
  shuttleId: string,
  note: string | null,
}

const ShuttleBusView = ({ shuttleId, note }: ShuttleBusViewProps) => {
  const { theme } = useTheme();
  const { data } = useShuttleBuses(shuttleId);

  return (
    <>
      {note && <FontText style={[styles.note, { color: colors[theme].red }]}>{note}</FontText>}
      <BottomSheetFlatList
        contentContainerStyle={styles.contentContainer}
        data={data}
        renderItem={({ item }) => <ShuttleBusItem shuttleBus={item} />}
        keyExtractor={item => item.shuttleBusId}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default ShuttleBusView;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 40
  },
  note: {
    textAlign: 'center',
    marginBottom: 10
  }
});
