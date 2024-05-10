import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { OperatingStatus } from '@/constants/meal';
import { OperatingType } from '@/types/mealTypes';
import { determineTimeStatus } from '@/utils/date';
import { StyleSheet, View } from 'react-native';

export interface OperatingTimeProps {
  operatingTime: string;
  isToday?: boolean;
}

const OperatingTimeItem = ({ operatingTime, isToday }: OperatingTimeProps) => {
  const operatingStatus = isToday ? determineTimeStatus(operatingTime) : OperatingStatus.PREPARE as OperatingType;
  const backgroundColor = colors.operationStatus[operatingStatus.value].background;
  const textColor = colors.operationStatus[operatingStatus.value].text;
  const operatingName = operatingStatus.name;

  return (
    <View
      style={[styles.operatingTimeContainer, { backgroundColor: backgroundColor }]}>
      <FontText fontWeight="600"
                style={[styles.operatingTime, { color: textColor }]}>{`${operatingName} ${operatingTime}`}</FontText>
    </View>
  );
};

export default OperatingTimeItem;

const styles = StyleSheet.create({
  operatingTimeContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 6,

    borderRadius: 20
  },
  operatingTime: {
    fontSize: 12
  }
});
