<template lang="pug">
    nuxt-child
</template>

<script>
export default {
    layout: 'admin',
    middleware: 'admin-auth',
    async fetch ({store}) {
        await store.dispatch('authSet')
        // console.log(store.state.userData)
        return {}
    }
};
</script>