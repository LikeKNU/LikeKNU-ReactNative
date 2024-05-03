import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

const TabHeader = ({ children }: PropsWithChildren) => {
  return (
    <View style={styles.header}>
      {children}
    </View>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 10,
    paddingHorizontal: 20
  }
});
