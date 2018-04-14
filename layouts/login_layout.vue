<template lang="pug">
    nuxt
</template>

<script>
export default {
  mounted() {
    $(function() {
      $("body").addClass("bg-dark");
    });
  }
};
</script>
