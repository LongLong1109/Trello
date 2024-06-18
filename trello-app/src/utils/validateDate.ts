export const isDateOverdue = (date: Date) => {
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)

  const timeDifference = date.getTime() - currentDate.getTime()
  return timeDifference < 0
}

export const convertDateToString = (date: Date) => {
  return date.toLocaleDateString()
}

export const formatDate = (date: Date): string => {
  if (!date || isNaN(date.getTime())) {
    return '---'
  }

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}
