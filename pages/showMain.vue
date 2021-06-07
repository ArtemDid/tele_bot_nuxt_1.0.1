<template>
  <section>
    <div>{{ this.hasUser }}</div>

    <div>----{{ this.mas }}</div>
  </section>
</template>



<script>
export default {
  data() {
    return {
      count: 0,
      mas: [],
    };
  },
  computed: {
    hasUser() {
      this.count = this.$store.getters.mass_list.rows;

      return this.count;
    },
    hasUserOne() {
      this.mas = this.$store.getters.mass_list.rows;

    //   return this.mas[0];
    },
  },

  methods: {
      hasUserOne1() {
        this.mas = this.$store.getters.mass_list.rows;
        return this.mas[0];
      },
    },

  middleware: ["list"],
};
</script>