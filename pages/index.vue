<template lang="pug">
    nuxt-child
</template>

<script>
export default {
    async fetch ({store}) {
        await store.dispatch('authSet')
        return {}
    }
};
</script>