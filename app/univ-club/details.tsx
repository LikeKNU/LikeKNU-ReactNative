import { useClubDetails } from '@/api/univClub';
import BackHeader from '@/common/components/BackHeader';
import CampusSwitch from '@/common/components/CampusSwitch';
import PageLayout from '@/common/components/PageLayout';
import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import { Campuses } from '@/constants/campus';
import colors from '@/constants/colors';
import { Club } from '@/types/univClubTypes';
import { findCampusColor, findClubCategoryColor } from '@/utils/color';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const UnivClubDetailsPage = () => {
  const { theme } = useTheme();
  const { clubId } = useLocalSearchParams<{ clubId: string }>();
  const { data, isValidating }: { data: Club, isValidating: boolean } = useClubDetails(parseInt(clubId));

  return (
    <PageLayout edges={['top']}>
      <BackHeader title="동아리" />
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
        {data &&
          <>
            <Image
              style={{ width: 72, height: 72, borderRadius: 50, marginRight: 10 }}
              source={data.logoImageUrl ? { uri: data.logoImageUrl } : require('@/assets/icon.png')}
              contentFit={'cover'}
            />
            <View style={{ flex: 1, justifyContent: 'space-between', gap: 8 }}>
              <FontText fontWeight="800" style={{ fontSize: 22 }}>{data.name}</FontText>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontText fontWeight="600" style={{
                  fontSize: 16,
                  color: findClubCategoryColor(data.category)
                }}>{data.category}</FontText>
                <FontText style={{ fontSize: 16, color: colors[theme].gray200 }}> | </FontText>
                <FontText fontWeight="600" style={{ fontSize: 16, color: colors[theme].gray100 }}>{data.tag}</FontText>
              </View>
            </View>
            <View style={{
              backgroundColor: colors[theme].gray300,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8
            }}>
              <FontText fontWeight="600"
                        style={{ fontSize: 15, color: findCampusColor(data.campus) }}>{data.campus}</FontText>
            </View>
          </>
        }
      </View>
    </PageLayout>
  )
    ;
}

export default UnivClubDetailsPage;
