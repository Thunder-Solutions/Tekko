const parseCsv = require('./parse-csv')
const uploadToStoryblok = require('./storyblok')

parseCsv('schedule.csv').then(events => {
  uploadToStoryblok(events, true)
})
