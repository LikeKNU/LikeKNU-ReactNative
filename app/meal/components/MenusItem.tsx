import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { StyleSheet, View } from 'react-native';
import { LayoutChangeEvent } from 'react-native/Libraries/Types/CoreEventTypes';

export interface MenusItemProps {
  menus: string | null;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const MenusItem = ({ menus, onLayout }: MenusItemProps) => {
  const { theme } = useTheme();
  let leftMenu: string[];
  let rightMenu: string[];

  if (menus && menus.includes('B코너')) {
    const menuCorner = menus.split('B코너');
    menuCorner[1] = 'B코너'.concat(menuCorner[1]);

    leftMenu = menuCorner[0].split(' ');
    rightMenu = menuCorner[1].split(' ');
  } else {
    const menuList: string[] = menus ? menus.split(' ') : [];
    const centerPoint = Math.ceil(menuList.length / 2);

    leftMenu = menuList.slice(0, centerPoint);
    rightMenu = menuList.slice(centerPoint);
  }

  return (
    <View onLayout={onLayout} style={{ flexDirection: 'row' }}>
      {menus ? <>
          <View style={{ flex: 1 }}>
            {leftMenu.map(value =>
              <FontText key={value} fontWeight="500" style={styles.menus} numberOfLines={1}>{value}</FontText>
            )}
          </View>
          <View style={{ flex: 1 }}>
            {rightMenu.map(value =>
              <FontText key={value} fontWeight="500" style={styles.menus} numberOfLines={1}>{value}</FontText>
            )}
          </View>
        </> :
        <FontText fontWeight="500" style={{ color: colors[theme].gray100, fontSize: 15 }}>등록된 메뉴가 없어요</FontText>
      }
    </View>
  );
};

export default MenusItem;

const styles = StyleSheet.create({
  menus: {
    fontSize: 15,
    marginBottom: 2
  }
});
