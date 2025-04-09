<template>
  <div class="table-container">
    <table v-editable="blok">
      <thead>
        <tr>
          <th v-for="header in blok.table.thead" :key="header._uuid">
            {{ header.value }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in blok.table.tbody" :key="row._uuid">
          <td v-for="cell in row.body" :key="cell._uuid">
            {{ cell.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  margin: var(--size-2);
  box-sizing: border-box;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  text-align: left;
  border: 1px solid;
  padding: var(--size-2);
}
th {
  font-weight: bold;
  background-color: var(--color-primary-base);
  border-color: var(--color-primary-base);
  color: var(--color-primary-contrast-base);
}
</style>

<script>
export default {
  props: ['blok'],
  mounted() {
    console.log(this.blok)
  },
}
</script>
