import SwitchingIcon from '@/assets/icons/arrow-light-arrow-left.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import { Campuses, campusName } from '@/constants/campus';
import colors from '@/constants/colors';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Pressable, StyleSheet } from 'react-native';

export interface CampusSwitchProps {
  handleSelectCampus: (campus: Campuses | null) => void;
  containAll?: boolean;
}

const CampusSwitch = ({ handleSelectCampus, containAll }: CampusSwitchProps) => {
  const { theme } = useTheme();
  const { showActionSheetWithOptions } = useActionSheet();

  const size = containAll ? Object.values(Campuses).length + 1 : Object.values(Campuses).length;

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        showActionSheetWithOptions({
          title: '캠퍼스를 선택하세요',
          options: Object.values(Campuses).map(campus => campusName[campus].name)
            .concat(containAll ? ['전체'] : [])
            .concat(['닫기']),
          cancelButtonIndex: containAll ? Object.values(Campuses).length + 1 : Object.values(Campuses).length,
          cancelButtonTintColor: colors[theme].red
        }, index => {
          if (index && index >= size) {
            return;
          }

          if (containAll && index === size - 1) {
            handleSelectCampus(null);
            return;
          }

          handleSelectCampus(Object.values(Campuses)[index!]);
        });
      }}
    >
      <SwitchingIcon width={14} height={14} fill={colors[theme].gray100} />
      <FontText fontWeight="700" style={{ color: colors[theme].gray100, fontSize: 15 }}>캠퍼스 변경</FontText>
    </Pressable>
  );
};

export default CampusSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 2,
    paddingVertical: 6
  }
});
