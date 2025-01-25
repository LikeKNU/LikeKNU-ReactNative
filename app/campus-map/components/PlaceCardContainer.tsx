import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import { campusMapMockData } from '@/constants/campusMapMockData';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface PlaceCardContainerProps {
  placeId: number;
}

const PlaceCardContainer = ({ placeId }: PlaceCardContainerProps) => {
  const { bottom } = useSafeAreaInsets();
  const { theme } = useTheme();
  const router = useRouter();
  const placeInfo = campusMapMockData.filter(place => place.id === placeId)[0];
  console.log(placeInfo);

  return (
    <Pressable
      style={{
        position: 'absolute',
        paddingVertical: 18,
        paddingHorizontal: 20,
        bottom: bottom + 20,
        height: '35%',
        width: '90%',
        borderRadius: 26,
        marginHorizontal: 20,
        backgroundColor: colors[theme].container,
        alignItems: 'center',
        shadowColor: Platform.OS === 'ios' ? colors[theme].gray200 : colors[theme].elevation,
        elevation: 6,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 12,
        shadowOpacity: 0.8
      }}
      onPress={() => router.navigate({ pathname: '/campus-map/details', params: { placeId } })}
    >
      <View
        style={styles.titleContainer}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 8, alignItems: 'center' }}>
          <FontText fontWeight="700" style={{ fontSize: 20 }} numberOfLines={1}>{placeInfo.name}</FontText>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <ArrowRightIcon width={24} height={24} />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FontText style={{ color: colors[theme].gray100 }}>간단한 정보가 들어갈 예정이에요</FontText>
        <FontText style={{ color: colors[theme].gray100 }}>박스를 누르면 상세 정보로 이동해요</FontText>
      </View>
    </Pressable>
  );
};

export default PlaceCardContainer;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  }
});
