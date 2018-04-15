<template lang="pug">
    nuxt-child
</template>

<script>
export default {
    async fetch ({store}) {
        await store.dispatch('authSet')
        // console.log(store.state.userData)
        return {}
    }
};
</script>