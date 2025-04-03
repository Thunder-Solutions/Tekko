const getStdOffset = date => {
  const jan = new Date(date.getFullYear(), 0, 1)
  const jul = new Date(date.getFullYear(), 6, 1)
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
}

const getDstOffset = date => {
	const stdOffset = getStdOffset(date)
	const isDST = date.getTimezoneOffset() < stdOffset
  return isDST ? stdOffset - 60 : stdOffset
}

const adjustToTimezone = date => {
  const hours = +date.getHours()
  const minutes = +date.getMinutes()
  if (hours === 0 && minutes === 0) return date
  date.setMinutes(minutes - getDstOffset(date))
  return date
}

const parse = dateStr => {
  if (!dateStr) return
  const regex = /(\d{4})-(\d{2})-(\d{2})/
  const dateArr = dateStr.match(regex)
  const [, year, month, day] = dateArr
  return `${month}/${day}/${year}`
}

const getString = num => num || num === 0 ? String(num) : ''

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const dateGetters = {
  year: date => date ? getString(date.getFullYear()) : '',
  month: date => date ? (date.getMonth() ? months[date.getMonth()] : '') : '',
  day: date => date ? getString(date.getDate()) : '',
  iso: date => date instanceof Date && !isNaN(date) ? date.toISOString() : '',
}

export default dateStr => {
  const parsedDate = parse(dateStr)
  const fullDate = adjustToTimezone(new Date(parsedDate))
  return {
    fullDate,
    getISO: () => dateGetters.iso(fullDate),
    getDay: () => dateGetters.day(fullDate),
    getMonth: () => dateGetters.month(fullDate),
    getYear: () => dateGetters.year(fullDate),
  }
}