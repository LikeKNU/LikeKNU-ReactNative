import { addBookmark, removeBookmark } from '@/api/announcement';
import BookmarkIcon from '@/assets/icons/bookmark-fill.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import { useDeviceId } from '@/utils/device';
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';

export interface BookmarkItemProps {
  announcementId: string;
  isBookmarked: boolean;
  handleChange?: (isBookmark: boolean) => void;
}

const BookmarkItem = ({ announcementId, isBookmarked, handleChange }: BookmarkItemProps) => {
  const { theme } = useTheme();
  const { deviceId } = useDeviceId();
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const fill = isBookmark ? colors[theme].blue : colors[theme].gray300;

  useEffect(() => {
    setIsBookmark(isBookmarked);
  }, [isBookmarked]);

  const changeBookmark = () => {
    if (announcementId) {
      if (isBookmark) {
        removeBookmark(announcementId, deviceId!);
      } else {
        addBookmark(announcementId, deviceId!);
      }
    }

    if (handleChange) {
      handleChange(!isBookmark);
    }

    setIsBookmark(!isBookmark);
  };

  return (
    <Pressable style={{padding: 4}} onPress={changeBookmark}>
      <BookmarkIcon width={24} height={24} fill={fill} />
    </Pressable>
  );
};

export default BookmarkItem;
