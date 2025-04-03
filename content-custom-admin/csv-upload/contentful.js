const { createClient } = require('contentful-management')

const config = {

  // can be generated at:
  // contentful.com/developers/documentation/content-management-api
  accessToken: 'da39h5c_4b_eUaEYAse-gEkMfpka3Gl2EDT6L0Kig5Y',

  // can be found in the space settings.
  spaceId: 'l95k2pa1pp59',

  // get data and look for the _uid field of the schedule
  scheduleId: 'schedule',
}

const client = createClient({
  host: 'cdn.contentful.com',
  accessToken: config.accessToken,
})

const uploadToContentful = async (events, overwrite) => {
  const space = await client.getSpace(config.spaceId)
  const environment = await space.getEnvironment('dev')
  // const responseGet = await space.getEntry(config.scheduleId)
  // const existingEvents = responseGet.fields.events
  // const updatedEntry = {
  //   ...responseGet.fields.events,
  //   fields: {
  //     events: [
  //       ...(overwrite ? [] : existingEvents),
  //       events,
  //     ],
  //   },
  // }
  // const responseUpdate = await space.updateEntry(updatedEntry)

  // logs...
  console.log(environment)
  // console.log(responseGet)
  // console.log(responseUpdate)
}

module.exports = uploadToContentful
