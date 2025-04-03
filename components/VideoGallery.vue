<template>
  <div class="videoGallery" v-editable="blok" ref="videoGallery">
    <dynamic-title class="title">{{ blok.title }}</dynamic-title>
    <div class="videoContainer" id="Video">
      <div
        class="video"
        :class="'video--' + video.id"
        v-for="video in blok.videos"
        :key="video._uid"
        ref="videos"
      >
        <div :id="'Player_' + video.id" :data-video-id="video.id"></div>
      </div>
    </div>
    <div class="thumbnailContainer">
      <img
        class="thumbnail"
        v-for="video in blok.videos"
        :key="video._uid"
        :src="getThumbnail(video.id)"
        :data-video-id="video.id"
        alt="video thumbnail"
        aria-label="select this thumbnail to reveal the corresponding video above."
        aria-controls="Video"
        tabindex="0"
        @click="switchVideo"
        @keydown.enter="switchVideo"
      />
    </div>
  </div>
</template>

<style scoped>
  .videoGallery {
    padding: var(--size-2);
    padding-top: var(--size-4);
    box-sizing: border-box;
    max-width: calc(var(--content-max-width) - var(--size-7));
    margin: 0 auto;
  }

  .video {
    height: var(--size-8);
    width: 100%;
    position: relative;
    background-color: black;
  }

  .video--active:not(.video--loaded)::before {
    content: '';
    display: block;
    position: absolute;
    width: 13vw;
    height: 13vw;
    border: 0 solid;
    border-radius: 50%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-color: black;
    z-index: 1;
  }

  .video--active:not(.video--loaded)::after {
    animation: spin 0.3s linear infinite;
    content: '';
    display: block;
    position: absolute;
    width: 15vw;
    height: 15vw;
    border: 0 solid;
    border-radius: 50%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-image: conic-gradient(transparent, white);
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(359deg); }
  }

  .video:not(.video--active):not(:first-child) {
    position: absolute;
    z-index: -1;
    visibility: hidden;
  }

  .video--loaded {
    display: none;
  }

  .video--active {
    display: block;
    visibility: visible;
  }

  .title {
    margin: 0;
    font-size: var(--size-3);
  }

  .thumbnailContainer {
    display: flex;
    width: 100%;
    overflow: auto;
    text-align: center;
  }

  .thumbnail {
    height: var(--size-6);
    margin: 1px;
    cursor: pointer;
    filter: brightness(50%);
    transition: filter 0.3s;
  }

  .thumbnail:hover,
  .thumbnail:focus {
    filter: brightness(100%);
  }

  @media (min-width: 960px) {
    .video {
      height: var(--size-9);
    }
  }

</style>

<script>
  export default {
    props: ['blok'],
    data() {
      return {
        videoPlayers: new Map(),
      }
    },
    methods: {
      getThumbnail(id) {
        return `http://img.youtube.com/vi/${id}/0.jpg`
      },
      switchVideo(event) {
        const {videoGallery, videos} = this.$refs
        const id = event.currentTarget.dataset.videoId
        const targetVideo = videoGallery.querySelector(`.video--${id}`)
        videos.forEach(video => video.classList.remove('video--active'))
        const players = Array.from(this.videoPlayers.keys())
        players.forEach(player => player.stopVideo && player.stopVideo())
        targetVideo.classList.add('video--active')
      },
    },
    mounted() {
      const {videos} = this.$refs
      const {apiReady, playerReady} = youtubeIntegration
      videos[0].classList.add('video--active')
      
      apiReady.addCallback(() => {
        videos.forEach(video => {
          const playerPlaceholder = video.firstElementChild

          // This constructor replaces the element of the given id
          // with an <iframe> (and YouTube player)
          const player = new YT.Player(playerPlaceholder.id, {
            height: '100%',
            width: '100%',
            videoId: playerPlaceholder.dataset.videoId,
            playerRefs: {origin: window.location.origin},
            host: `${window.location.protocol}//www.youtube.com`,
            events: {'onReady': onPlayerReady},
          })

          this.videoPlayers.set(player, video)

          playerReady.addCallback(player, event => {
            const container = this.videoPlayers.get(event.target)
            container.classList.add('video--loaded')
          })

        })
      })

    },
  }
</script>
