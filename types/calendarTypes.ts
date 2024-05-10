export interface ScheduleProps {
  scheduleId: string;
  scheduleContents: string;
  scheduleDate: string;
}

export interface CalendarProps {
  scheduleCriterion: string;
  scheduleWrapper: ScheduleProps[];
}
