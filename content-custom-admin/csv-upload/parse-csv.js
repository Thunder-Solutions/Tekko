const fs = require('fs') 
const csvReader = require('fast-csv')
const mapEvent = require('./map-event')

const parseCsv = file => {
  const stream = fs.createReadStream(file)
  const data = []
  return new Promise(resolve => {
    csvReader.parseStream(stream, { headers: true }).on('data', line => {
      const newEvent = mapEvent(line)
      if (newEvent.location) data.push(newEvent)
    }).on('end', () => resolve(data))
  })
}

module.exports = parseCsv
