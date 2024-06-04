export const isDateOverdue = (date: Date) => {
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)

  const timeDifference = date.getTime() - currentDate.getTime()
  return timeDifference < 0
}
