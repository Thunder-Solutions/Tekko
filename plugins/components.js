import Vue from 'vue'
import GenericPage from '~/components/GenericPage.vue'
import HomePage from '~/components/HomePage/HomePage.vue'
import GlobalMenuItem from '~/components/Global/GlobalMenuItem.vue'
import RichText from '~/components/RichText/RichText.vue'
import FeaturedContent from '~/components/FeaturedContent.vue'
import ConditionalContent from '~/components/ConditionalContent.vue'
import Section from '~/components/Section/Section.vue'
import DynamicLink from '~/components/DynamicLink.vue'
import StoryblokLink from '~/components/StoryblokLink.vue'
import EmbedCode from '~/components/EmbedCode.vue'
import StoryblokEmbedCode from '~/components/StoryblokEmbedCode.vue'
import Text from '~/components/Text.vue'
import TabbedContent from '~/components/TabbedContent.vue'
import VideoGallery from '~/components/VideoGallery.vue'
import Image from '~/components/Image.vue'
import CollapsibleContent from '~/components/CollapsibleContent.vue'
import DynamicTitle from '~/components/DynamicTitle.vue'
import BusinessLogo from '~/components/BusinessLogo.vue'
import Grid from '~/components/Grid.vue'
import Notice from '~/components/Notice.vue'
import ParallaxContainer from '~/components/Parallax/ParallaxContainer.vue'
import ParallaxLayer from '~/components/Parallax/ParallaxLayer.vue'
import TicketPriceTable from '~/components/TicketPriceTable/TicketPriceTable.vue'
import TicketFeature from '~/components/TicketPriceTable/TicketFeature.vue'
import SemanticIcon from '~/components/Icons/SemanticIcon.vue'
import ImageGallery from '~/components/ImageGallery.vue'
import Schedule from '~/components/Schedule/Schedule.vue'
import ScheduleExtended from '~/components/ScheduleExtended/ScheduleExtended.vue'
import CallToAction from '~/components/CallToAction/CallToAction.vue'
import Action from '~/components/CallToAction/Action.vue'
import Group from '~/components/Group.vue'
import ThunderEventsVue from '~/components/ThunderEvents.vue'
import SwitchControl from '~/components/SwitchControl.vue'
import ButtonLink from '~/components/ButtonLink.vue'

// internal components
Vue.component('global-menu-item', GlobalMenuItem)
Vue.component('rich-text', RichText)
Vue.component('dynamic-link', DynamicLink)
Vue.component('storyblok-link', StoryblokLink)
Vue.component('embed-code', EmbedCode)
Vue.component('dynamic-title', DynamicTitle)
Vue.component('parallax-container', ParallaxContainer)
Vue.component('parallax-layer', ParallaxLayer)
Vue.component('semantic-icon', SemanticIcon)
Vue.component('switch-control', SwitchControl)

// storyblok components
Vue.component('blok-generic--page', GenericPage)
Vue.component('blok-home--page', HomePage)
Vue.component('blok-featured--content', FeaturedContent)
Vue.component('blok-section', Section)
Vue.component('blok-conditional--content', ConditionalContent)
Vue.component('blok-text', Text)
Vue.component('blok-tabbed--content', TabbedContent)
Vue.component('blok-embed--code', StoryblokEmbedCode)
Vue.component('blok-video--gallery', VideoGallery)
Vue.component('blok-image', Image)
Vue.component('blok-collapsible--content', CollapsibleContent)
Vue.component('blok-business--logo', BusinessLogo)
Vue.component('blok-grid', Grid)
Vue.component('blok-notice', Notice)
Vue.component('blok-ticket--price--table', TicketPriceTable)
Vue.component('blok-ticket--feature', TicketFeature)
Vue.component('blok-image--gallery', ImageGallery)
Vue.component('blok-schedule', Schedule)
Vue.component('blok-schedule--extended', ScheduleExtended)
Vue.component('blok-call--to--action', CallToAction)
Vue.component('blok-action', Action)
Vue.component('blok-group', Group)
Vue.component('blok-thunder--events', ThunderEventsVue)
Vue.component('blok-button--link', ButtonLink)
