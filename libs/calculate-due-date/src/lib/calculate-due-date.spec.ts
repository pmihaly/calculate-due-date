import { BusinessWeekConfiguration, calculateDueDate } from '.'

describe('calculateDueDate', () => {
  it('should calculate due date on zero turnaround time', () => {
    const businessWeekConfiguration: BusinessWeekConfiguration = {
      dayBeginMinutes: 540,
      dayEndMinutes: 1020,
      workdays: new Set(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']),
    }

    const dueDate = calculateDueDate({ businessWeekConfiguration })({
      submitDate: new Date('2023/10/24 14:23:14'),
      turnaroundMinutes: 0,
    })

    expect(dueDate).toStrictEqual(new Date('2023/10/24 14:23:14'))
  })

  it('should calculate due date when turnaround is within same workday', () => {
    const businessWeekConfiguration: BusinessWeekConfiguration = {
      dayBeginMinutes: 540,
      dayEndMinutes: 1020,
      workdays: new Set(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']),
    }

    const dueDate = calculateDueDate({ businessWeekConfiguration })({
      submitDate: new Date('2023/10/24 14:23:14'),
      turnaroundMinutes: 60,
    })

    expect(dueDate).toStrictEqual(new Date('2023/10/24 15:23:14'))
  })
})
