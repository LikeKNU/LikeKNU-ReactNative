import AnimatedPressable from '@/common/components/AnimatedPressable';
import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { StyleSheet, View } from 'react-native';

interface DateSelectorProps {
  handleChangeDate: (index: number) => void,
  active: number
}

const DateSelector = ({ handleChangeDate, active }: DateSelectorProps) => {
  const { theme } = useTheme();

  const DateButton = ({ index, name }: { index: number, name: string }) => {
    return (
      <AnimatedPressable
        onPress={() => handleChangeDate(index)}
        style={styles.buttonContainer}
        animatedViewStyle={styles.buttonAnimatedView}
      >
        <FontText fontWeight="600" style={{
          fontSize: active === index ? 18 : 15,
          color: active === index ? colors[theme].contrast : colors[theme].gray100
        }}>{name}</FontText>
      </AnimatedPressable>
    );
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <DateButton index={0}  name={'오늘 (월)'}/>
      <DateButton index={1}  name={'내일 (화)'}/>
    </View>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  buttonContainer: { padding: 10 },
  buttonAnimatedView: { borderRadius: 12 }
});
