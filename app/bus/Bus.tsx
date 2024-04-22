import PageLayout from '@/common/components/PageLayout';
import FontText from '@/common/text/FontText';
import { StyleSheet, View } from 'react-native';

const Bus = () => {
  return (
    <PageLayout edges={['top']}>
      <View style={styles.header}>
        <FontText fontWeight="700" style={styles.title}>버스</FontText>
      </View>
    </PageLayout>
  );
};

export default Bus;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 10,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24
  }
});
