import { DayInWeek, MinutesSinceMidnight } from '.'

export type BusinessWeekConfiguration = {
  dayBeginMinutes: MinutesSinceMidnight
  dayEndMinutes: MinutesSinceMidnight
  workdays: ReadonlySet<DayInWeek>
}
