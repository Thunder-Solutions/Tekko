import Vuex from 'vuex'
import DateParser from '~/assets/DateParser.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      cacheVersion: '',
      current_event_start_date: '',
      current_event_end_date: '',
      next_event_start_date: '',
      next_event_end_date: '',
      sponsors: [],
      location: '',
      social_media: [],
      embedded_map: '',
      logo: '',
      splash_image: '',
      next_splash_image: '',
      menu: [],
      global_content_callbacks: [],
      content_loaded: false,
      host: '',
      footer_links: [],
      global_alert: '',
    },
    getters: {
      currentStartDate(state) { return DateParser(state.current_event_start_date) },
      currentEndDate(state) { return DateParser(state.current_event_end_date) },
      nextStartDate(state) { return DateParser(state.next_event_start_date) },
      nextEndDate(state) { return DateParser(state.next_event_end_date) },
      eventIsOver(state) { return Date.now() > DateParser(state.current_event_end_date).fullDate.getTime() },
      sponsors(state) { return state.sponsors },
      location(state) { return state.location },
      socialMedia(state) { return state.social_media },
      embeddedMap(state) { return state.embedded_map },
      websiteFeedbackBlurb(state) { return state.website_feedback_blurb },
      embeddedFeedbackForm(state) { return state.embedded_feedback_form },
      embeddedBugForm(state) { return state.embedded_bug_form },
      logo(state) { return state.logo },
      splashImage(state) {
        const eventIsOver = Date.now() > DateParser(state.current_event_end_date).fullDate.getTime()
        return eventIsOver ? state.next_splash_image : state.splash_image
      },
      menu(state) { return state.menu },
      host(state) { return state.host },
      footerLinks(state) { return state.footer_links },
      globalAlert(state) { return state.global_alert },
    },
    mutations: {
      updateGlobalContent(state, payload) {
        state.current_event_start_date = payload.current_event_start_date
        state.current_event_end_date = payload.current_event_end_date
        state.next_event_start_date = payload.next_event_start_date
        state.next_event_end_date = payload.next_event_end_date
        state.sponsors = payload.sponsors
        state.location = payload.location
        state.social_media = payload.social_media
        state.embedded_map = payload.embedded_map
        state.website_feedback_blurb = payload.website_feedback_blurb
        state.embedded_feedback_form = payload.embedded_feedback_form
        state.embedded_bug_form = payload.embedded_bug_form
        state.logo = payload.logo
        state.splash_image = payload.splash_image
        state.next_splash_image = payload.next_splash_image
        state.menu = payload.menu
        state.footer_links = payload.footer_links
        state.global_alert = payload.global_alert
      },
      setHost(state, payload) {
        state.host = payload.host
      },
    },
    actions: {
      loadGlobalContent({ commit, state }) {
        return this.$storyapi.get('cdn/stories/home?token=T8bdyQB3B70Ti543MYrXsgtt', {
          version: 'published',
        }).then(({data}) => commit('updateGlobalContent', data.story.content))
        .catch(res => console.error(res.response ? res.response.data : res))
      },
    },
  })
}

export default createStore
