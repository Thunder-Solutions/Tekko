const DEFAULT_EVENT = {
  id: 0,
  name: '(No name provided)',
  location: '',
  start: new Date(),
  end: new Date(),
  description: '(No description provided)',
  host: '(No host provided)',
  category: '(No category provided)',
}

const ROLLOVER_TIME = '3:00 AM'

module.exports = { DEFAULT_EVENT, ROLLOVER_TIME }
