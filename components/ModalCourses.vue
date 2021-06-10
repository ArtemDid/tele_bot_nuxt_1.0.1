<template>
  <section>
    <button class="btn btn-dark" @click="$bvModal.show('modal-scoped')">Monitoring of courses</button>

    <b-modal id="modal-scoped">
      <template>
        <div>
          <h1>Monitoring of courses</h1>

          <div>
            <ChartLine />
          </div>
        </div>
      </template>

      <template #modal-footer="{ cancel }">
        <b-dropdown :text="title" block>
          <b-dropdown-item
            v-for="item of currency"
            :key="item"
            href="#"
            @click="gerCur"
            >{{ item }}</b-dropdown-item
          >
        </b-dropdown>
        <b-button variant="danger" @click="cancel()"> Cancel </b-button>
      </template>
    </b-modal>
  </section>
</template>

<script>
import ChartLine from "@/components/ChartLine.vue";

export default {
  components: {
    ChartLine,
  },
  data() {
    return {
      currency: [
        "AZN",
        "BYN",
        "CAD",
        "CHF",
        "CNY",
        "CZK",
        "DKK",
        "EUR",
        "GBP",
        "GEL",
        "HUF",
        "ILS",
        "JPY",
        "KZT",
        "MDL",
        "NOK",
        "PLZ",
        "RUB",
        "SEK",
        "SGD",
        "TMT",
        "TRY",
        "USD",
        "UZS",
      ],
      rate: "Currency",
    };
  },
    computed: {
      title(){
      return this.rate;
    }
    },
  methods: {
    gerCur($event) {
      this.rate = $event.target.outerText;
      console.log("cur", this.rate);
      this.$store.dispatch("show_rates", this.rate);
    },
    
  },
};
</script>

<style lang="scss" scoped>

.grid {
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>