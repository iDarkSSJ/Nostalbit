export function formatDate(date: string | number | undefined) {
  if (date) {
    const newDate = new Date(date)

    const localDate = new Date(newDate.toLocaleString())

    const day = localDate.getDate().toString().padStart(2, '0')
    const month = (localDate.getMonth() + 1).toString().padStart(2, '0')
    const year = localDate.getFullYear()

    let hours = localDate.getHours()
    const minutes = localDate.getMinutes().toString().padStart(2, '0')
    const period = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12 || 12

    const formattedDate = `${day}/${month}/${year}`
    const formattedTime = `${hours}:${minutes} ${period}`

    return `${formattedDate} ${formattedTime}`
  }

  return 'Empty'
}