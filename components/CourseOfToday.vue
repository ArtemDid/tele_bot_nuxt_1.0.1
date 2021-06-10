<template>
  <section>
    <button type="button" class="btn btn-dark" @click="showModal">Course for Today</button>
<!-- <a class="btn btn-dark" href="#" role="button">Link</a> -->
    <b-modal id="modal-scoped-course">
      <template>
        <div>
          <h1>Monitoring of courses</h1>

          <div>
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
                {{ row.baseCurrency }}
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
          </div>
        </div>
      </template>

      <template #modal-footer="{ cancel, ok }">
        <b-button variant="danger" @click="cancel()"> Cancel </b-button>
        <b-button variant="success" @click="ok()"> OK</b-button>
      </template>
    </b-modal>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      filter: null,
      filterOn: [],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      fields: [
        { key: "baseCurrency", sortable: true },
        { key: "currency", sortable: true },
        { key: "purchaseRateNB", sortable: true },
        { key: "saleRateNB", sortable: true },
      ],
    };
  },
  computed: {
    count() {
      return this.$store.getters.ratesToday;
    },
        totalRows() {
      return this.$store.getters.ratesToday.length;
    },
  },
  methods: {
    showModal($event) {
      console.log(this);
      this._bv__modal.show("modal-scoped-course");
      this.$store.dispatch("ratesToday");
    },
     onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

