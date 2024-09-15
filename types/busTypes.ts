export interface CityBusRouteProps {
  routeId?: string;
  origin: string;
  destination: string;
  nextArrivalTime?: string | null;
}

export interface CityBusProps extends CityBusRouteProps {
  arrivalStop: string;
  departureStop: string;
  buses: BusArrivalProps[];
}

export interface BusArrivalProps {
  busNumber: string | null;
  remainingTime: string | null;
  busColor: string | null;
  arrivalAt?: string | null;
}

export interface ShuttleRouteProps {
  shuttleId: string;
  origin: string;
  destination: string;
  note: string | null;
  nextDepartureTime: string;
}

export interface ShuttleBusProps {
  busName: string;
  isRunning: boolean;
  times: ShuttleTimeProps[];
}

export interface ShuttleTimeProps {
  arrivalStop: string;
  arrivalTime: string;
}
