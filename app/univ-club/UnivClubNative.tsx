import { useClubs } from '@/api/univClub';
import ClubFilter from '@/app/univ-club/components/ClubFilter';
import UnivClubListItem from '@/app/univ-club/components/UnivClubListItem';
import BackHeader from '@/common/components/BackHeader';
import CampusSwitch from '@/common/components/CampusSwitch';
import PageLayout from '@/common/components/PageLayout';
import { useCampus } from '@/common/contexts/CampusContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import { Campuses, campusName } from '@/constants/campus';
import { clubCategoryName } from '@/constants/clubCategories';
import colors from '@/constants/colors';
import { ClubListProps, ClubTypes } from '@/types/univClubTypes';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const UnivClubNative = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { data, isValidating }: { data: ClubListProps[], isValidating: boolean } = useClubs();
  const { bottom } = useSafeAreaInsets();
  const { campus } = useCampus();
  const [selectedCampus, setSelectedCampus] = useState<Campuses | null>(campus);
  const [filteredClubs, setFilteredClubs] = useState<ClubListProps[]>([]);
  const [filter, setFilter] = useState<ClubTypes | null>(null);

  useEffect(() => {
    if (campus) {
      setSelectedCampus(campus);
    }
  }, [campus]);

  useEffect(() => {
    if (selectedCampus && data) {
      if (filter) {
        setFilteredClubs(data.filter(club => club.campus === campusName[selectedCampus].name && club.category === clubCategoryName[filter]));
        return;
      }
      setFilteredClubs(data.filter(club => club.campus === campusName[selectedCampus].name));
    }
  }, [selectedCampus, data, filter]);

  return (
    <PageLayout edges={['top']} style={{ backgroundColor: colors[theme].container }}>
      <BackHeader title="동아리" onPress={() => router.back()}
                  button={<CampusSwitch handleSelectCampus={setSelectedCampus} />} />
      <View>
        <ClubFilter filter={filter} setFilter={setFilter} />
      </View>
      {filteredClubs && filteredClubs.length !== 0 ?
        <FlatList
          contentContainerStyle={{ paddingBottom: bottom }}
          data={filteredClubs}
          renderItem={({ item }) => <UnivClubListItem club={item} />}
        /> :
        <View style={{ height: '75%', alignItems: 'center', justifyContent: 'center' }}>
          <FontText fontWeight="600" style={{ color: colors[theme].gray100, fontSize: 15 }}>동아리가 없어요</FontText>
        </View>
      }
    </PageLayout>
  );
};

export default UnivClubNative;

const styles = StyleSheet.create({
  container: {},
  noticeContainer: {
    alignItems: 'center',
    paddingVertical: 8
  },
  subNotice: {
    fontSize: 13
  }
});
