import { BusinessWeekConfiguration, daysInWeek, Minutes } from '.'

export type CalculateDueDate = (o: {
  businessWeekConfiguration: BusinessWeekConfiguration
}) => (o: { submitDate: Date; turnaroundMinutes: Minutes }) => Date

export const calculateDueDate: CalculateDueDate =
  ({ businessWeekConfiguration }) =>
  ({ submitDate, turnaroundMinutes }) =>
    calculateDueDateTail(businessWeekConfiguration)({
      turnaroundMinutesLeft: turnaroundMinutes,
      currentDueDate: submitDate,
    })

const calculateDueDateTail =
  (config: BusinessWeekConfiguration) =>
  ({ turnaroundMinutesLeft, currentDueDate }: { turnaroundMinutesLeft: number; currentDueDate: Date }): Date => {
    const minutesWorkedToday = differenceInMinutes(
      getEndOfWorkday(currentDueDate, config.dayEndMinutes),
      currentDueDate
    )

    const isEndingToday = turnaroundMinutesLeft <= minutesWorkedToday
    if (isEndingToday) return addMinutesToDate(currentDueDate, turnaroundMinutesLeft)

    return calculateDueDateTail(config)({
      turnaroundMinutesLeft: turnaroundMinutesLeft - minutesWorkedToday,
      currentDueDate: getNextWorkdayStart(currentDueDate, config),
    })
  }

const getEndOfWorkday = (date: Date, dayEndMinutes: Minutes): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, dayEndMinutes, 0)

const getNextWorkdayStart = (date: Date, config: BusinessWeekConfiguration): Date => {
  const tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, config.dayBeginMinutes, 0)

  const isWorkday = config.workdays.has(daysInWeek[tomorrow.getDay()])
  if (isWorkday) return tomorrow

  return getNextWorkdayStart(tomorrow, config)
}

const addMinutesToDate = (date: Date, mins: Minutes): Date =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes() + mins,
    date.getSeconds()
  )

const differenceInMinutes = (dateA: Date, dateB: Date): Minutes =>
  new Date(dateA.getTime() - dateB.getTime()).getTime() / 60_000
