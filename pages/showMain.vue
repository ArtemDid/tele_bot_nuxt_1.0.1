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
table td div, thead th div {
  text-align: center;
}

thead th{
  width: 20%;
}

body {
  background-color: rgb(240, 240, 245);
  min-height: 100vh;
}

.page-link{
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
        { key: "name", sortable: true },
        { key: "query", sortable: true },
      ],
    };
  },
  middleware: ["list"],


  computed: {
    count() {
      return this.$store.getters.mass_list;
    },
    totalRows() {
      return this.$store.getters.mass_list.length;
    },
  },

  methods: {
    // info(item, index, button) {
    //   this.infoModal.title = `Row index: ${index}`
    //   this.infoModal.content = JSON.stringify(item, null, 2)
    //   this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    // },
    // resetInfoModal() {
    //   this.infoModal.title = ''
    //   this.infoModal.content = ''
    // },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  // async asyncData({ store }) {
  //   console.log("iii", store.getters.mass_list);
  //   if (store.getters.mass_list.length === 0) {
  //     console.log("iii2");
  //     this.hasUserOne();
  //     console.log("iii3", store.getters.mass_list.length);
  //     const count = store.getters.mass_list;
  //     return count;
  //   }
  // },

  // asyncData(context) {
  //   // Universal keys
  //   const {
  //     store,
  //   } = context;

  //   // Client-side
  //   if (process.server) {
  //     console.log("iii2", store.getters.mass_list);
  //     store.dispatch('massListAsync')
  //     return store.getters.mass_list;

  //   }

  // },

  // data() {
  //   return {
  //     count: [],
  //   };
  // },

  //   async fetch() {
  //     fetch(`http://localhost:3001/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-access-token": process.browser ? localStorage.token : "",
  //       },
  //       body: JSON.stringify({ email: "", password: "" }),
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log(data);
  //         console.log("iii2");
  //         console.log(localStorage.token);

  //         if (data.success) {
  //           console.log("good");
  //           this.count = data.row;
  //         } else {
  //           console.log("error");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Not Found");
  //       });
  //   },
  // fetchOnServer: false,
};
</script>