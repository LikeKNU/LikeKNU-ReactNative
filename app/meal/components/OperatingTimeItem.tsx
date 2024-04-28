import FontText from '@/common/text/FontText';
import { StyleSheet, View } from 'react-native';

const OperatingTimeItem = ({ operatingTime }: { operatingTime: string }) => {
  return (
    <View style={styles.operatingTimeContainer}>
      <FontText fontWeight="700" style={styles.operatingTime}>{`운영중 ${operatingTime}`}</FontText>
    </View>
  );
};

export default OperatingTimeItem;

const styles = StyleSheet.create({
  operatingTimeContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 6,

    borderRadius: 20,
    backgroundColor: '#D6E1F5'
  },
  operatingTime: {
    color: '#5C91EF',
    fontSize: 12
  }
});
