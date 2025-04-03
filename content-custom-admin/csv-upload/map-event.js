const { DEFAULT_EVENT, ROLLOVER_TIME } = require('./constants')
const { toStandardTimeString } = require('./utilities')

const get24Hr = time => {
  const [rawHour, minute] = time.replace(/ [aApP][mM]$/, '').split(':')
  const hour = time.endsWith('PM') && rawHour !== '12' ? `${+rawHour + 12}` : time.endsWith('AM') && rawHour === '12' ? '00' : rawHour
  return [+hour, +minute]
}

const isWithinThreshold = time => {
  const [rollOverHr, rollOverMt] = get24Hr(ROLLOVER_TIME)
  const [hour, minute] = get24Hr(time)
  return hour <= rollOverHr
}

const getDate = (line, specified) => {
  const time = line[`${specified} Time`] || '12:00 PM'
  const date = line['Date'] ?? '7/19/2023'
  const dateString = `${date} ${time}`
  const datetime = new Date(dateString)
  if (isWithinThreshold(time)) datetime.setDate(datetime.getDate() + 1)
  return datetime
}

const mapEvent = line => ({
  ...DEFAULT_EVENT,
  id: line['guID'] || DEFAULT_EVENT.id,
  name: line['Event Name'] || DEFAULT_EVENT.name,
  location: line['Location'] || DEFAULT_EVENT.location,
  start: getDate(line, 'Start') || DEFAULT_EVENT.start,
  end: getDate(line, 'End') || DEFAULT_EVENT.end,
  description: line['Event Description'] || DEFAULT_EVENT.description,
  host: line['Host'] || DEFAULT_EVENT.host,
  category: line['Category'] || DEFAULT_EVENT.category,
})

module.exports = mapEvent
