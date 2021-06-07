<template>
  <v-toolbar color="purple" dark>
    <v-spacer></v-spacer>
    <span class="subheading">{{ this.hasUser }}</span>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text> News </v-btn>

      <v-divider vertical></v-divider>

      <v-btn text> Blog </v-btn>

      <v-divider vertical></v-divider>

      <v-btn text> Music </v-btn>

      <v-btn text>
        <!-- <router-link to="this.$router.routes.name('registration2')">Logout</router-link> -->
        <nuxt-link active-class="active" to="/"> Logout </nuxt-link>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

export default {
  computed: {
    hasUser() {
      return process.browser ? localStorage.login : "";
    },
  },
};
</script>