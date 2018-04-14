<template lang="pug">
  div
    nav-comp
    nuxt
</template>

<script>
import { mapState } from "vuex";
import navBar from "~/components/nav_bar.vue";
export default {
  components: {
    "nav-comp": navBar
  },
  computed: {
    ...mapState({
      user: "user"
    })
  },
  mounted() {
    $(function() {
      $("body").addClass("bg-dark");
    });
  },
  watch: {
    user(val) {
      if (val === null) this.$router.push("/login");
    }
  }
};
</script>
