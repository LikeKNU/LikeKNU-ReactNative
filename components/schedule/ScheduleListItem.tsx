import FontText from '@/components/text/FontText';
import { ScheduleItemProps, ScheduleProps } from '@/types/scheduleType';
import { FlatList } from 'react-native';

const ScheduleListItem = ({ scheduleList }: { scheduleList: ScheduleProps }) => {
  return (
    <FlatList
      data={scheduleList.scheduleWrapper}
      renderItem={({ item }: { item: ScheduleItemProps }) => <FontText>{item.scheduleContents}</FontText>}
      keyExtractor={item => item.scheduleDate + item.scheduleContents}
    />
  );
};

export default ScheduleListItem;
