<template lang="pug">
    nuxt(v-if="!loading")
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      loading: "page_loading"
    })
  },
  mounted() {
    $(function() {
      $("body").addClass("bg-dark");
    });
  }
};
</script>
