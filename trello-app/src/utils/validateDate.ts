export const isDateOverdue = (date: Date) => {
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)

  const timeDifference = date.getTime() - currentDate.getTime()
  return timeDifference < 0
}

const isValidDate = (dateString: string | null): boolean => {
  if (!dateString) {
    return false
  }

  const dateParts = dateString.split('/')

  const month = parseInt(dateParts[0]) - 1
  const day = parseInt(dateParts[1])
  const year = parseInt(dateParts[2])

  if (isNaN(month) || isNaN(day) || isNaN(year)) {
    return false
  }

  if (month < 1 || month > 12 || day < 1 || year < 1) {
    return false
  }

  const dateObject = new Date(year, month, day)
  return (
    dateObject.getFullYear() === year &&
    dateObject.getMonth() === month &&
    dateObject.getDate() === day
  )
}

export const formatDate = (date: Date | null): string => {
  const dateString = date!.toLocaleDateString()
  if (!isValidDate(dateString)) {
    return 'Invalid date'
  }

  const dateParts = dateString!.split('/')
  const month = parseInt(dateParts[0], 10) - 1
  const day = parseInt(dateParts[1], 10)
  const year = parseInt(dateParts[2], 10)

  const dateObject = new Date(year, month, day)

  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' }
  return new Intl.DateTimeFormat('en-US', options).format(dateObject)
}
