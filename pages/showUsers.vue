<template>
  <section>
    <b-table
      :items="count"
      :current-page="currentPage"
      :fields="fields"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      @filtered="onFiltered"
    >
      <template #cell(count)="row" id="col">
        {{ row.id }}{{ row.login }}
      </template>
      <template #cell(path)="row">
        <div class="img">
          <b-img thumbnail fluid :src="row.item.path ? row.item.path : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'" alt="Image 1"></b-img>
        </div>
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
        ></b-pagination>
      </b-col>
    </b-row>
  </section>
</template>

<style >
.img img{
  border-radius: 50%;
  width: 100%;
}
.img{
    max-width: 50px;
    text-align: center;
}
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
      currentPage: 1,
      perPage: 5,
      filter: null,
      filterOn: [],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      fields: [
        { key: "id", sortable: true },
        { key: "login", sortable: true },
        { key: "path", sortable: false },
      ],
      mainProps: {
        blank: true,
        blankColor: "#777",
        width: 75,
        height: 75,
        class: "m1",
      },
    };
  },
  middleware: ["list"],

  computed: {
    count() {
      return this.$store.getters.users;
    },
    totalRows() {
      return this.$store.getters.users.length;
    },
  },

  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>