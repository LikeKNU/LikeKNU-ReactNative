export interface ScheduleProps {
  scheduleCriterion: string;
  scheduleWrapper: ScheduleItemProps[];
}

export interface ScheduleItemProps {
  scheduleContents: string;
  scheduleDate: string;
}
