import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { ValueNameType } from '@/types/common';
import { Pressable, StyleSheet, View } from 'react-native';

export interface TopTabsProps {
  handleTabPress: (tab: ValueNameType) => void;
  activeTab: ValueNameType;
  tabItems: ValueNameType[];
}

const TopTabs = ({ handleTabPress, activeTab, tabItems }: TopTabsProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.tabs, { borderBottomColor: colors[theme].gray300 }]}>
      {tabItems.map(item => (
        <Pressable
          key={item.value}
          onPress={() => handleTabPress(item)}
          style={[styles.tabItem, {
            borderBottomWidth: activeTab === item ? 2 : 0,
            borderBottomColor: colors[theme].contrast,
          }]}>
          <FontText
            fontWeight={activeTab === item ? '600' : '500'}
            style={{
              color: activeTab === item ? colors[theme].contrast : colors[theme].gray100,
              fontSize: 16
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
    justifyContent: 'space-evenly',

    paddingHorizontal: 20,
    borderBottomWidth: 0.6
  },
  tabItem: {
    padding: 10,
    width: 80,
    alignItems: 'center'
  }
});
