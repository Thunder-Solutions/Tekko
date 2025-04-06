const pkg = require('./package')
const axios = require('axios')

module.exports = {
  target: 'static',

  /*
  ** Headers of the page
  */
  head: {
    script: [
      { src: 'https://unpkg.com/thunder-events@latest/umd/thunderEvents.min.js' },
      { src: '/thunderEvents_0.3.5.js' },
      { src: '/googleTagManager.js' },
      { src: 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?skin=sunburst' },
      { src: 'https://www.youtube.com/iframe_api' },
      { src: '/youtubeIntegration.js' },
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/tekko-favicon.png' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/fonts/fonts.css' },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/components',
    '~/plugins/filters',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['storyblok-nuxt', {accessToken: 'T8bdyQB3B70Ti543MYrXsgtt', cacheProvider: 'memory'}],
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...Object.keys(config.resolve.alias).reduce((alias, key) => {
              if (key !== '@') alias[key] = config.resolve.alias[key]
              return alias
            }, {}),
            '~': __dirname,
          },
        },
      }
    },
  },

  generate: {
    routes: function (callback) {
      const token = 'T8bdyQB3B70Ti543MYrXsgtt'
      const version = 'published'
      let cache_version = 0
   
      let toIgnore = ['home', 'en/settings']
      
       // other routes that are not in Storyblok with their slug.
      let routes = ['/'] // adds / directly
   
       // Load space and receive latest cache version key to improve performance
      axios.get(`https://api.storyblok.com/v1/cdn/spaces/me?token=${token}`).then((space_res) => {
   
         // timestamp of latest publish
        cache_version = space_res.data.space.version
   
         // Call for all Links using the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
        axios.get(`https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&cv=${cache_version}&per_page=100`).then((res) => {
          Object.keys(res.data.links).forEach((key) => {
            if (!toIgnore.includes(res.data.links[key].slug)) {
              routes.push('/' + res.data.links[key].slug)
            }
          })
   
          callback(null, routes)
        })
      }) 
    },
  },

  server: {
    host: '0.0.0.0',
  },
}
