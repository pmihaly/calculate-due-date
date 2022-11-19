import { BusinessWeekConfiguration, calculateDueDate } from '.'

const createBusinessWeekConfiguration = (config: Partial<BusinessWeekConfiguration>): BusinessWeekConfiguration => ({
  dayBeginMinutes: 540,
  dayEndMinutes: 1020,
  workdays: new Set(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']),
  ...config,
})

describe('calculateDueDate', () => {
  it('should calculate due date on zero turnaround time', () => {
    const businessWeekConfiguration = createBusinessWeekConfiguration({})

    const dueDate = calculateDueDate({ businessWeekConfiguration })({
      submitDate: new Date('2023/10/24 14:23:14'),
      turnaroundMinutes: 0,
    })

    expect(dueDate).toStrictEqual(new Date('2023/10/24 14:23:14'))
  })

  it('should calculate due date when turnaround is within same workday', () => {
    const businessWeekConfiguration = createBusinessWeekConfiguration({})

    const dueDate = calculateDueDate({ businessWeekConfiguration })({
      submitDate: new Date('2023/10/24 14:23:14'),
      turnaroundMinutes: 60,
    })

    expect(dueDate).toStrictEqual(new Date('2023/10/24 15:23:14'))
  })

  it('should calculate due date when turnaround overlaps workdays', () => {
    const businessWeekConfiguration = createBusinessWeekConfiguration({})

    const dueDate = calculateDueDate({ businessWeekConfiguration })({
      submitDate: new Date('2023/10/24 15:00:00'),
      turnaroundMinutes: 960,
    })

    expect(dueDate).toStrictEqual(new Date('2023/10/26 15:00:00'))
  })

  it('should calculate due date when turnaround overlaps weekends', () => {
    const businessWeekConfiguration = createBusinessWeekConfiguration({})
    const friday = new Date('2023/10/27 15:00:00')

    const dueDate = calculateDueDate({ businessWeekConfiguration })({
      submitDate: friday,
      turnaroundMinutes: 960,
    })

    const tuesday = new Date('2023/10/31 15:00:00')
    expect(dueDate).toStrictEqual(tuesday)
  })
})
