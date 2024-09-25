export interface ScheduleProps {
  scheduleId: string;
  scheduleContents: string;
  scheduleDate: string;
  isToday: boolean;
}

export interface CalendarProps {
  scheduleCriterion: string;
  scheduleWrapper: ScheduleProps[];
}
