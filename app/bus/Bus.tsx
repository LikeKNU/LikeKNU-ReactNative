import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import FontText from '@/common/text/FontText';
import { StyleSheet } from 'react-native';

const Bus = () => {
  return (
    <PageLayout edges={['top']}>
      <TabHeader>
        <FontText fontWeight="700" style={styles.title}>버스</FontText>
      </TabHeader>
    </PageLayout>
  );
};

export default Bus;

const styles = StyleSheet.create({
  title: {
    fontSize: 22
  }
});
