import { useTheme } from '@/common/components/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { Pressable, StyleSheet, View } from 'react-native';

export interface TopTabItemProps {
  value: string;
  name: string;
}

export interface TopTabsProps<T extends TopTabItemProps> {
  handleTabPress: (tab: T) => void;
  activeTab: T;
  tabItems: T[];
}

const TopTabs = <T extends TopTabItemProps>({ handleTabPress, activeTab, tabItems }: TopTabsProps<T>) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.tabs, { borderBottomColor: colors[theme].gray300 }]}>
      {tabItems.map(item => (
        <Pressable
          key={item.value}
          onPress={() => handleTabPress(item)}
          style={{
            borderBottomWidth: activeTab === item ? 2 : 0,
            borderBottomColor: colors[theme].contrast,
            padding: 10,
            marginHorizontal: 6
          }}>
          <FontText
            fontWeight={activeTab === item ? '600' : '500'}
            style={{
              color: activeTab === item ? colors[theme].contrast : colors[theme].gray100,
              fontSize: 17
            }}
          >{item.name}</FontText>
        </Pressable>
      ))}
    </View>
  );
};

export default TopTabs;

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    borderBottomWidth: 0.6
  }
});
