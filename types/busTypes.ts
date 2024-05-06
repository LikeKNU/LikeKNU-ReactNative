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

export interface ShuttleRouteProps {
  /*origin: string;
  destination: string;
  departureTime: string | null;*/
  shuttleId: string;
  shuttleName: string;
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
