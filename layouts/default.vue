<template>
  <div>
    <Navbar />

    <main>
      <div class="container">
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  setup() {},
  components: {
    Navbar,
  },
};
</script>

<style>

</style>
