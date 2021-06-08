<template>
  <section>
    <b-button @click="$bvModal.show('modal-scoped')">Open Modal</b-button>

    <b-modal id="modal-scoped">
      <template>
        <p>Monitoring of courses</p>

        <div>
          <h1>Chart Demo</h1>

          <div>
            <ChartLine />
          </div>
        </div>
      </template>

      <template #modal-footer="{ cancel }">
        <b-dropdown text="Currency" block>
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
      date: "USD",
    };
  },
  //   computed: {
  //     gerCur: {
  //       get: function () {
  //         return this.date;
  //       },
  //       set: function (newValue) {
  //           console.log('cur', this.date)
  //         this.date = newValue;
  //       },
  //     },
  //   }
  methods: {
    gerCur($event) {
      this.date = $event.target.outerText;
      console.log("cur", this.date);
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