const StoryblokClient = require('storyblok-js-client')

const config = {

  // can be found in your My account section
  oauthToken: 'qFto9Qx1rrPyxT60ESXxrgtt-48183-HAeesJyq64yiBhT3oE-y',

  // can be found in the space settings.
  spaceId: '54555',

  // navigate into your folder and copy the id from the URL at app.storyblok.com <- last one
  parentFolder: '90571490',

  // get data and look for the _uid field of the schedule section
  scheduleSectionId: 'df91b07f-cb7d-423e-8b82-f87f29843c21',

  // get data and look for the _uid field of the schedule container
  scheduleContainerId: 'e49ee4d3-d1a4-4b43-b732-426d0a435beb',

  // get data and look for the _uid field of the schedule
  scheduleId: 'f0cad9ba-61cc-43e2-8071-a545760d8045',
}

// Initialize the client with the oauth token
const Storyblok = new StoryblokClient({
  oauthToken: config.oauthToken,
})

const getEventsFromStory = story => {
  const pageContent = story.content.content
  if (!pageContent) throw new Error('No page content found.')
  const sectionData = pageContent.find(({ _uid }) => _uid === config.scheduleSectionId)
  if (!sectionData) throw new Error('No section data found.')
  const scheduleContainer = sectionData.content.find(({ _uid }) => _uid === config.scheduleContainerId)
  if (!scheduleContainer) throw new Error('No schedule container found.')
  const scheduleData = scheduleContainer.content.find(({ _uid }) => _uid === config.scheduleId)
  if (!scheduleData) throw new Error('No schedule data found.')
  return scheduleData.events
}

const toStoryblokDate = date => {
  const formats = {
    'yyyy-MM-dd': date.toISOString().slice(0, 10),
    'HH:mm':  date.toTimeString().slice(0, 5),
  }
  return `${formats['yyyy-MM-dd']} ${formats['HH:mm']}`
}

const uploadToStoryblok = async (events, overwrite) => {
  try {
    const responseGet = await Storyblok.get(
      `spaces/${config.spaceId}/stories/${config.parentFolder}`,
      {},
    )
    const { story } = responseGet.data
    const existingEvents = getEventsFromStory(story)
    const updatedStory = {
      ...story,
      content: {
        ...story.content,
        content: story.content.content.map(blok => {
          if (blok._uid !== config.scheduleSectionId) return blok
          return {
            ...blok,
            content: blok.content.map(blok => {
              if (blok._uid !== config.scheduleContainerId) return blok
              return {
                ...blok,
                content: blok.content.map(blok => {
                  if (blok._uid !== config.scheduleId) return blok
                  return {
                    ...blok,
                    events: [
                      ...(overwrite ? [] : existingEvents),
                      ...events.map(event => (isNaN(event.start) && console.log(event)) || ({
                        ...event,
                        start: event.start,
                        end: event.end,
                        component: 'ThunderEvents-Event',
                      })),
                    ],
                  }
                }),
              }
            }),
          }
        }),
      },
    }
    const responsePut = await Storyblok.put(
      `spaces/${config.spaceId}/stories/${config.parentFolder}`,
      { story: updatedStory },
    )
    // console.log(getEventsFromStory(updatedStory).find(({ name }) => name.startsWith('Ace')))
    // console.log(getEventsFromStory(updatedStory)[0].start)
    console.log(responsePut)
    Storyblok.flushCache()
  } catch (error) {
    console.error(error)
  }
}

module.exports = uploadToStoryblok
