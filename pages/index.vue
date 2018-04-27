<template lang="pug">
    .container.text-center.my-5
        h1 Home
        nuxt-link(to="/admin") Admin Panel
        span &nbsp;&nbsp;|&nbsp;&nbsp;
        nuxt-link(to="/school") School Panel
</template>

<script>
export default {};
</script>