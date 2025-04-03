window.youtubeIntegration = {
  apiReady: {
    callbacks: new Map(),
    addCallback(callback) {
      const key = String(callback)
      this.callbacks.set(key, callback)
      if (YT.loaded) callback()
    },
  },
  playerReady: {
    callbacks: new Map(),
    readyPlayers: [],
    addCallback(player, callback) {
      const key = String(callback)
      const playerIsReady = this.readyPlayers.includes(player)
      this.callbacks.set(key, callback)
      if (playerIsReady) callback()
    },
  },
}

window.onYouTubeIframeAPIReady = () => {
  const {apiReady} = youtubeIntegration
  const allCallbacks = Array.from(apiReady.callbacks.values())
  allCallbacks.forEach(fn => fn())
}

window.onPlayerReady = event => {
  const {playerReady} = youtubeIntegration
  const allCallbacks = Array.from(playerReady.callbacks.values())
  playerReady.readyPlayers.push(event.target)
  allCallbacks.forEach(fn => fn(event))
}
