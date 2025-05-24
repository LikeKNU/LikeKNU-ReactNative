export const buses = {
  SHUTTLE_BUS: { value: 'shuttle-bus', name: '셔틀버스' },
  CITY_BUS: { value: 'city-bus', name: '시내버스' }
};

export enum RouteType {
  INCOMING = 'incoming',
  OUTGOING = 'outgoing'
}

export const routeType = {
  OUTGOING: { value: 'outgoing', name: '학교에서 출발' },
  INCOMING: { value: 'incoming', name: '학교로 도착' }
}
