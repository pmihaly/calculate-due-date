import { BusinessWeekConfiguration, Minutes } from '.'

export type CalculateDueDate = (o: {
  businessWeekConfiguration: BusinessWeekConfiguration
}) => (o: { submitDate: Date; turnaroundMinutes: Minutes }) => Date

export const calculateDueDate: CalculateDueDate =
  () =>
  ({ submitDate }) =>
    submitDate
