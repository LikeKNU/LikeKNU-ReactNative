import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import FontText from '@/common/text/FontText';
import { StyleSheet } from 'react-native';

const More = () => {
  return (
    <PageLayout edges={['top']}>
      <TabHeader>
        <FontText fontWeight="700" style={styles.title}>더보기</FontText>
      </TabHeader>
    </PageLayout>
  );
};

export default More;

const styles = StyleSheet.create({
  title: {
    fontSize: 22
  }
});
