<template lang="pug">
  div(v-if="!loading")
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
      loading: "page_loading",
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
