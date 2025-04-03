const toStandardTimeString = (time, AMPM) => {
  return (
    time.toUpperCase() === 'NOON'
    ? '12:00 PM'
    : time
        .trim() // remove leading/trailing spaces
        .replace(/\s+/g, ' ') // remove multiple spaces
        .toUpperCase() // convert to uppercase 
        .replace(/(\d)([PA])M/, '$1 $2M') // add space between digit and AM/PM
        .replace(/^(\d{1,2}) ([PA]M)/, '$1:00 $2') // add minutes if they are missing
        .replace(/(\d)$/, `$1 ${AMPM}`)
  )
}

module.exports = { toStandardTimeString }
