import AnimatedPressable from '@/common/components/AnimatedPressable';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { ClubListProps } from '@/types/univClubTypes';
import { findCampusColor } from '@/utils/color';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const UnivClubListItem = ({ club }: { club: ClubListProps }) => {
  const { theme } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.navigate({
      pathname: '/univ-club/details',
      params: {
        clubId: club.id
      }
    });
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={[styles.container, { borderBottomColor: colors[theme].gray300 }]}
      animatedViewStyle={{ borderRadius: 12, paddingHorizontal: 20 }}
    >
      <View style={{ flex: 7 }}>
        <FontText fontWeight="500" style={[styles.body, { color: colors[theme].contrast }]}>
          {club.name}
        </FontText>
        <View style={styles.additionalContainer}>
          <FontText style={[{ color: colors[theme].gray100 }, styles.additional]}>
            {club.category + ' | ' + club.tag}
          </FontText>
        </View>
      </View>
      <View style={{ flex: 3, alignItems: 'flex-end', justifyContent: 'center' }}>
        <View style={{
          backgroundColor: colors[theme].gray300,
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderRadius: 8
        }}>
          <FontText fontWeight="600"
                    style={{ fontSize: 15, color: findCampusColor(club.campus) }}>{club.campus}</FontText>
        </View>
      </View>
    </AnimatedPressable>
  );
};

export default UnivClubListItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  additional: {
    flexDirection: 'row',
    alignItems: 'center',

    fontSize: 13
  },
  body: {
    fontSize: 18
  },
  additionalContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingTop: 4
  }
});
