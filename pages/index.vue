<template>
  <div class="container">
    <div v-if="$route.query.message" class="alert alert-danger mb-3">
      Need login first
    </div>
    <h1>Sign in</h1>
    <b-form @submit="onSubmit" @reset="onReset">
      <label for="email">Email address:</label>
      <b-form-input
        id="email"
        v-model="getEmail"
        type="email"
        placeholder="Enter email"
        :state="validation"
        required
      ></b-form-input>

      <label for="password">Password:</label>
      <b-form-input
        id="password"
        v-model="getPassword"
        type="password"
        placeholder="Enter password"
        :state="validation"
        required
      ></b-form-input>

      <b-form-invalid-feedback :state="validation">
        {{ this.$store.getters.user.message }}
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validation">
        Looks Good.
      </b-form-valid-feedback>

      <b-button class="submit" type="submit" variant="primary">Submit</b-button>
      <b-button class="submit" type="reset" variant="danger">Reset</b-button>
      
      <div class="d-flex flex-row bd-highlight">
        <div class="bd-highlight">Or &nbsp;</div>
        <div class="bd-highlight">
          <nuxt-link active-class="active" to="/registration">
            register now!
          </nuxt-link>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    validation() {
      return this.$store.getters.user.success;
    },
    getEmail: {
      get: function () {
        return typeof localStorage !== 'undefined'?localStorage.login: this.form.email;
      },
      set: function (newValue) {
        if (localStorage.length > 0) localStorage.clear();
        this.form.email = newValue;
      },
    },
    getPassword: {
      get: function () {
        return this.form.password;
      },
      set: function (newValue) {
        this.form.password = newValue;
      },
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      if(!this.form.email) this.form.email = this.getEmail;

      this.$store.dispatch("fetch_auth", this.form);
    },
    onReset(event) {
      event.preventDefault();
      this.form.email = "";
      this.form.password = "";
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
}
.submit{
  margin-top: 5px;
}
</style>
