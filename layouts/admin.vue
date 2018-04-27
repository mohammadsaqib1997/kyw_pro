<template lang="pug">
  div
    nav-comp(v-if="user !== null")
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
  destroyed () {
    $(function() {
      $("body").removeClass("bg-dark");
    });
  },
  watch: {
    user(val) {
      if (val === null) this.$router.push("/admin/login");
    }
  }
};
</script>
