<template>
  <div class="ticket-table-container" v-editable="blok">
    <div class="disclaimer-box">
      <p>{{blok.disclaimer_text}}</p>
    </div>
    <div class="ticket-table-wrapper">
      <table class="ticket-table">
        <caption class="screen-reader">Ticket Options for Tekko</caption>
        <thead class="ticket-table-header">
          <tr>
            <td class="empty-cell"></td>
            <template v-for="(ticket, index) in blok.ticket_type">
              <th
                scope="col"
                class="ticket-header" 
                :key="ticket._uid">
                <div class="ticket-header__title">
                  {{ticket.title}}
                </div>
                <div class="ticket-header__price">
                  ${{getTicketPrice(index)}}
                </div>
              </th>
            </template>
          </tr>
        </thead>
        <tbody class="ticket-table-body">
          <template v-for="(feature, idx) in blok.ticket_feature">
            <tr class="mobileFeatureHeader" :key="`title_${feature._uid}`">
              <th scope="colgroup" colspan="3">{{ feature.description }}</th>
            </tr>
            <blok-ticket--feature :class="`feature ${idx % 2 === 0 ? 'feature--odd' : ''}`" :blok="feature" :key="feature._uid"></blok-ticket--feature>
          </template>
        </tbody>
      </table>
    </div>

    <div class="purchaseContainer" v-if="blok.show_purchase_link">
      <p class="purchaseText">Choose your badge(s) on the following page!</p>
      <storyblok-link
        class="purchaseButton"
        :link="blok.purchase_link"
      >Purchase Now!</storyblok-link>
    </div>
  </div>
</template>

<style scoped>
  .disclaimer-box {
    padding: 1rem 1rem 0 1rem;
  }

  .ticket-table {
    border-collapse: collapse;
    width: 100%;
  }

  .ticket-table-header {
    position: sticky;
    top: 8.3rem;
    left: 0;
  }

  .mobileFeatureHeader > th {
    padding: 1rem;
  }

  .ticket-header {
    --color-primary-base: rgba(12, 20, 53, 0.9);
    padding: 0 var(--size-1);
    font-family: 'Orbitron';
    font-size: 3vw;
    color: var(--color-primary-contrast-base);
    position: relative;
  }

  .ticket-header__title {
    font-weight: normal;
    background: var(--color-primary-base);
    padding: var(--size-2);
    position: relative;
  }

  .purchaseContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }

  .purchaseText {
    text-align: right;
    margin: 0;
  }

  .purchaseButton {
    height: var(--size-3);
    width: 100%;
    color: var(--color-primary-contrast-base);
    background-color: var(--color-primary-focus);
    border: none;
    box-shadow: 2px 2px 0 var(--color-primary-accent);
    cursor: pointer;
    transition: filter 0.3s;
    margin: 0;
    text-decoration: none;
    display: inline-block;
    width: auto;
    height: auto;
    padding: var(--size-1) var(--size-3);
    font-size: var(--size-3);
    text-align: center;
  }

  .purchaseButton:hover {
    filter: brightness(1.5);
  }

  .ticket-header__price {
    color: var(--color-primary-base);
    text-align: right;
    position: relative;
  }

  .ticket-header__price:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    background-color: var(--color-primary-base);
    height: 100%;
    width: 50%;
    clip-path: polygon(
      0 0,
      100% 0,
      70% 100%,
      0 100%
    );
  }

  .hidden {
    display: none;
  }

  .feature {
    background-color: var(--color-primary-contrast-alt);
  }

  @media (min-width: 760px) {
    .ticket-header { font-size: 1.6rem; }
    .mobileFeatureHeader { display: none; }
    .feature--odd { background: var(--color-primary-alt-3); }
  }

  @media (max-width: 759px) {
    .ticket-table { table-layout: fixed; }
    .empty-cell { display: none; }
    .mobileFeatureHeader { background: var(--color-primary-alt-3); }
  }

</style>

<script>
  import TicketFeature from './TicketFeature.vue'
  import DateParser from '~/assets/DateParser.js'

  /**
   * Component representing different ticket types and features available for purchase
   * props: ['blok']
   * @ticket_type {storyblok - TicketType} Schema in Storyblok representing a ticket's price and title
   * @ticket_feature {TicketFeature, storyblok - blok} Individual table row indicating if each ticket has a particular feature
   *
   * Children components: TicketFeature
   */

  export default {
    props: ['blok'],

    methods: {

      getTicketPrice(index) {
        const {ticket_type} = this.$props.blok
        const ticket = ticket_type[index]
        const getTime = d => d && d !== '' && DateParser(d).fullDate.getTime()
        const preregDate = getTime(ticket.prereg_date)
        const earlyPreregDate = getTime(ticket.early_prereg_date)
        const isFuture = d => d && d > Date.now()
        return isFuture(earlyPreregDate) ? ticket.early_prereg_price
          : isFuture(preregDate) ? ticket.prereg_price
          : ticket.price
      },

    },

  }
</script>