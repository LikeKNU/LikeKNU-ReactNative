export enum Cafeterias {
  SODAM = '소담',
  NEULSOM = '늘솜',
  EUNHAENGSA_VISION = '은행사/비전',
  DREAM = '드림',
  STUDENT = '학생식당',
  EMPLOYEE = '직원식당',
  DORMITORY = '생활관식당'
}

export const cafeterias = {
  singwan: [Cafeterias.SODAM, Cafeterias.NEULSOM, Cafeterias.EUNHAENGSA_VISION, Cafeterias.DREAM],
  cheonan: [Cafeterias.STUDENT, Cafeterias.EMPLOYEE, Cafeterias.DORMITORY],
  yesan: [Cafeterias.STUDENT, Cafeterias.EMPLOYEE]
};
