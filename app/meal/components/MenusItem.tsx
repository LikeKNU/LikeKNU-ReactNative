import FontText from '@/common/text/FontText';
import { StyleSheet, View } from 'react-native';
import { LayoutChangeEvent } from 'react-native/Libraries/Types/CoreEventTypes';

export interface MenusItemProps {
  menus: string | null;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const MenusItem = ({ menus, onLayout }: MenusItemProps) => {
  const menuList: string[] = menus ? menus.split(' ') : [];

  return (
    <View onLayout={onLayout}>
      {menuList.map(value =>
        <FontText key={value} fontWeight="500" style={styles.menus}>{value}</FontText>
      )}
    </View>
  );
};

export default MenusItem;

const styles = StyleSheet.create({
  menus: {
    fontSize: 15
  }
});
