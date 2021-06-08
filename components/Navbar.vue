<template>
  <v-toolbar color="purple" dark>
    <v-spacer></v-spacer>
    <span class="subheading">{{ this.hasUser }}</span>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text> News </v-btn>

      <v-divider vertical></v-divider>

      <v-btn text> Blog </v-btn>

      <v-divider vertical></v-divider>

       <ModalCourses/> 

      <v-btn text>
        <!-- <router-link to="this.$router.routes.name('registration2')">Logout</router-link> -->
        <nuxt-link variant="dark" active-class="active" to="/">
          Logout
        </nuxt-link>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import ModalCourses from "@/components/ModalCourses.vue";

export default {
  components: {
    ModalCourses,
  },
  computed: {
    hasUser() {
      return process.browser ? localStorage.login : "";
    },
  },
};
</script>