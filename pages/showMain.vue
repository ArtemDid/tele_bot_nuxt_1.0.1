<template>
  <section>
    <b-table
      :items="count"
      :fields="fields"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
    >
      <template #cell(count)="row" id="col">
        {{ row.name }}
      </template>
    </b-table>
    <b-row>
      <b-col class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
          @change="getClick"
        ></b-pagination>
      </b-col>
    </b-row>
  </section>
</template>

<style >
section {
  margin: 0 auto;
  max-width: 70%;
}
table td div,
thead th div {
  text-align: center;
}

thead th {
  width: 20%;
}

body {
  background-color: rgb(240, 240, 245);
  min-height: 100vh;
}

.page-link {
  background-color: rgb(240, 245, 244);
}
</style>


<script>
export default {
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      filter: null,
      filterOn: [],
      sortBy: "",
      sortDesc: false,
      number: 0,
      sortDirection: "asc",
      fields: [
        { key: "id", sortable: true },
        { key: "name", sortable: true },
        { key: "query", sortable: true },
      ],
    };
  },
  middleware: ["list"],

  computed: {
    count() {
      console.log(this.$store.getters.history.rows);
      return this.$store.getters.history.rows;
    },
    totalRows() {
      console.log(this.$store.getters.history.count);
      return this.$store.getters.history.count;
    },
  },

  methods: {
    getClick($event) {
      console.log("ooo", $event);

      this.$store.dispatch("showPartHistory", {
        LIMIT: this.perPage,
        OFFSET: --$event * this.perPage,
      });
    },
  },
};
</script>