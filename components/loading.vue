<template lang="pug">
    .loading-page.z-1(v-if="loading")
        h4 Loading...
</template>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>

<script>
import { mapState } from "vuex";
import { auth } from "~/services/fireinit.js";
export default {
  computed: {
    ...mapState({
      loading: "page_loading"
    })
  },
  mounted() {
    const self = this;
    self.$nextTick(async () => {
      self.$nuxt.$loading.start();

      let res = await self.$store.dispatch("authCheck");
      
      if (res != null && self.$route.name == "login") {
        await self.$store.dispatch("userDataLoad");
        self.$router.push("/");
      } else if (res == null && self.$route.name != "login") {
        self.$router.push("/login");
      }

      await setTimeout(() => self.$nuxt.$loading.finish(), 1500);
    });
  },
  methods: {
    start() {
      this.$store.commit("setPageLoading", true);
    },
    finish() {
      this.$store.commit("setPageLoading", false);
    }
  }
};
</script>