
<template>
  <tr v-editable="blok">
    <th scope="row" class="desktopHeader">
      {{blok.description}}
    </th>
    <td v-for="(ticket_type, index) in blok.ticket_type" :key="id + '_' + index" class="tableCell">
      <semantic-icon :config="getIcon(ticket_type.has_feature)"></semantic-icon>
    </td>
  </tr>
</template>

<style scoped>

  .desktopHeader {
    height: 10vh;
    width: 40%;
    text-align: left;
    padding: var(--size-1) var(--size-1) var(--size-1) var(--size-2);
  }


  .tableCell {
    text-align: center;
    padding: 1rem;
  }

  @media (max-width: 759px) {
    .desktopHeader {
      display: none;
    }
  }

</style>

<script>
  import { randomUUID } from '~/utilities'

  export default {
    /**
     * Component representing ticket features in the Ticket Price Table (Admissions Page)
     * props: ['blok']
     * @description {storyblok - text} Description of the ticket feature
     * @ticket_type {storyblok - blok} Contains single option dropdown for ticket type and boolean representing if specified ticket
     * has this feature
     * Parent component: TicketPriceTable
     */

    props: ['blok'],

    computed: {
      id() {
        return randomUUID()
      },
    },

    data() {
      return {
        yesIconConfig: {
          class: 'icon--checked',
          altText: 'yes',
        },
        noIconConfig: {
          class: 'icon--unchecked',
          altText: 'no',
        },
      }
    },

    methods: {
      getIcon(bool) {
        return bool ? this.yesIconConfig : this.noIconConfig
      },
    },
  }
</script>