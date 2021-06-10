<template>
  <v-toolbar color="purple" dark>
    <v-spacer></v-spacer>
    <span class="subheading">{{ this.hasUser }}</span>

    <v-toolbar-items class="hidden-sm-and-down">
       <v-btn text v-if="!this.check">
      <nuxt-link
        variant="dark"
        active-class="active"
        to="/showMain"
        @click.native="checkBtn"
      >
        Back
      </nuxt-link>
       </v-btn>
      <v-btn text v-if="this.check">
        <nuxt-link
          variant="dark"
          active-class="active"
          to="/showUsers2"
          @click.native="checkBtnTrue"
        >
          Show Users
        </nuxt-link>
      </v-btn>

      <v-divider vertical v-if="check"></v-divider>

      <CourseOfToday v-if="check" />

      <v-divider vertical v-if="check"></v-divider>

      <ModalCourses v-if="check"/>

      <v-btn text v-if="check">
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
import CourseOfToday from "@/components/CourseOfToday.vue";

export default {
  data() {
    return {
    }
  },
  components: {
    ModalCourses,
    CourseOfToday,
  },
  computed: {
    hasUser() {
      return process.browser && localStorage.login;
    },
    check(){
      console.log(this.$store.getters.check)
      return this.$store.getters.check;
    },
  },
  methods: {
    checkBtn() {
      console.log('111')
      this.$store.dispatch('showUserCheckFalse')
    },
    checkBtnTrue() {
       console.log('222')
      this.$store.dispatch('showUserCheck')
    },
  },
};
</script>