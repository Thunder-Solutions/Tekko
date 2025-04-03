const parseCsv = require('./parse-csv')
const uploadToContentful = require('./contentful')

parseCsv('schedule.csv').then(events => uploadToContentful(events, true))
