import { useCafeterias } from '@/api/meal';
import CafeteriasSelector from '@/app/meal/components/CafeteriasSelector';
import MealView from '@/app/meal/components/MealView';
import PinAngleIcon from '@/assets/icons/pin-angle.svg';
import MealBannerAd from '@/common/ads/MealBannerAd';
import AnimatedPressable from '@/common/components/AnimatedPressable';
import PageLayout from '@/common/components/PageLayout';
import TabHeader from '@/common/components/TabHeader';
import TabTitle from '@/common/components/TabTitle';
import { useCampus } from '@/common/contexts/CampusContext';
import { useFavoriteCafeteria } from '@/common/contexts/FavoriteContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import { campusName } from '@/constants/campus';
import colors from '@/constants/colors';
import { CafeteriaProps } from '@/types/mealTypes';
import { sortPinElementTop } from '@/utils/data';
import { useDeviceId } from '@/utils/device';
import http from '@/utils/http';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, StyleSheet, useWindowDimensions, View } from 'react-native';
import { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel/src/components/Carousel';

const Meal = () => {
  const { theme } = useTheme();
  const { campus } = useCampus();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [cafeteriaList, setCafeteriaList] = useState<CafeteriaProps[]>([]);
  const { favoriteCafeteria, changeFavoriteCafeteria } = useFavoriteCafeteria();
  const { data: cafeterias } = useCafeterias();
  const { width: screenWidth } = useWindowDimensions();
  const carouselRef = React.useRef<ICarouselInstance>(null);
  const { deviceId } = useDeviceId();

  useEffect(() => {
    setActiveIndex(0);

    if (campus && cafeterias) {
      setCafeteriaList(favoriteCafeteria ? sortPinElementTop<CafeteriaProps>(cafeterias, cafeteria => cafeteria.cafeteriaId === favoriteCafeteria)
        : cafeterias);
    }
  }, [favoriteCafeteria, campus, cafeterias]);

  useEffect(() => {
    carouselRef.current?.scrollTo({ index: activeIndex, animated: true });
  }, [activeIndex]);

  const changeCafeteria = (index: number) => {
    setActiveIndex(index);
  };

  const reportDataStrange = () => {
    Alert.alert('메뉴 정보가 이상한가요?', '', [
      {
        text: '개발자에게 알리기',
        style: 'destructive',
        onPress: () => {
          Alert.alert('개발자에게 알림을 전송할까요?', '', [
            {
              text: '전송',
              style: 'destructive',
              onPress: () => {
                sendReport();
                Alert.alert('개발자에게 알림을 전송했어요!', '학교 홈페이지에서 메뉴를 확인해 보시겠어요?', [
                  {
                    text: '학교 홈페이지 열기',
                    onPress: () => {
                      Linking.openURL('https://www.kongju.ac.kr/KNU/16862/subview.do');
                    },
                    style: 'default'
                  },
                  {
                    text: '닫기',
                    style: 'cancel'
                  }
                ]);
              }
            },
            {
              text: '취소',
              style: 'cancel'
            }
          ]);
        }
      },
      {
        text: '학교 홈페이지 열기',
        onPress: () => {
          Linking.openURL('https://www.kongju.ac.kr/KNU/16862/subview.do');
        },
        style: 'default'
      },
      {
        text: '닫기',
        style: 'cancel'
      }
    ]);
  };

  const sendReport = () => {
    http.post('/api/reports', {
      campus: campusName[campus!].value,
      type: 'CAFETERIA_DATA_ISSUE',
      data: {
        deviceId: deviceId,
        cafeteriaId: cafeteriaList[activeIndex].cafeteriaId
      }
    }).then(() => {
    });
  };

  return (
    <PageLayout edges={['top']}>
      <TabHeader>
        <TabTitle title="식당메뉴" />
        <AnimatedPressable
          style={{ padding: 8 }}
          animatedViewStyle={{ borderRadius: 8 }}
          onPress={reportDataStrange}
        >
          <FontText fontWeight="500" style={{ color: colors[theme].gray100 }}>정보가 이상해요</FontText>
        </AnimatedPressable>
      </TabHeader>
      <MealBannerAd />
      <View style={styles.header}>
        {cafeteriaList && cafeteriaList.length > 0 &&
          <>
            <CafeteriasSelector
              cafeteriaList={cafeteriaList}
              activeIndex={activeIndex}
              handleOnPress={changeCafeteria}
            />
            <AnimatedPressable style={{ padding: 4 }} animatedViewStyle={{ borderRadius: 8 }}
                               onPress={() => changeFavoriteCafeteria(cafeteriaList[activeIndex].cafeteriaId)}>
              <PinAngleIcon width={26} height={26}
                            fill={favoriteCafeteria === cafeteriaList[activeIndex].cafeteriaId ? colors.light.red : colors[theme].gray200} />
            </AnimatedPressable>
          </>
        }
      </View>
      <Carousel
        ref={carouselRef}
        width={screenWidth}
        containerStyle={{ flex: 1 }}
        loop={false}
        data={cafeteriaList}
        renderItem={({ item: cafeteria, index }) =>
          <View key={cafeteria.cafeteriaId} style={styles.page}>
            <MealView cafeteria={cafeteria} isActive={index === activeIndex} />
          </View>
        }
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </PageLayout>
  );
};

export default Meal;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 12
  },
  page: {
    alignItems: 'center',
    paddingHorizontal: 20
  }
});
