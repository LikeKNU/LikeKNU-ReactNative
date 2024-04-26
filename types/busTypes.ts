export interface BusArrivalProps {
  busNumber: string | null;
  remainingTime: string | null;
  busColor: string | null;
}

export interface CityBusProps extends CityBusRouteProps {
  departureStop: string;
  buses: BusArrivalProps[];
}

export interface CityBusRouteProps {
  origin: string;
  destination: string;
}
