<template lang="pug">
    nav#mainNav.navbar.navbar-expand-lg.navbar-dark.bg-dark.static-nav
        nuxt-link.navbar-brand(to='/admin') ADMIN PANEL
        button.navbar-toggler.navbar-toggler-right(type='button', data-toggle='collapse', data-target='#navbarResponsive', aria-controls='navbarResponsive', aria-expanded='false', aria-label='Toggle navigation')
            span.navbar-toggler-icon
        #navbarResponsive.collapse.navbar-collapse
            //- Side Nav start here
            ul#navBarSide.navbar-nav.navbar-sidenav
                li.nav-item(data-toggle='tooltip', data-placement='right', v-for="item in nav_list_item" v-bind:title='item.title')
                    nuxt-link.nav-link(v-bind:to='item.link')
                        i.fa.fa-fw(v-bind:class="item.icon")
                        span.nav-link-text &nbsp;{{ item.title }}

            //- Top Bar start here
            ul.navbar-nav.ml-auto
                li.nav-item
                    a.nav-link(href="#" v-on:click.prevent="$store.dispatch('signOut')")
                        i.fa.fa-fw.fa-sign-out
                        | &nbsp;Logout

</template>

<style>
#navBarSide {
  overflow-y: auto;
}
</style>

<script>
export default {
  data() {
    return {
      nav_list_item: [
        {
          title: "Dashboard",
          link: "/admin",
          icon: 'fa-dashboard'
        },
        {
          title: "Drivers",
          link: "/admin/drivers",
          icon: 'fa-car'
        },
        {
          title: "Schools",
          link: "/admin/schools",
          icon: 'fa-building'
        },
        {
          title: "Students",
          link: "/admin/students",
          icon: 'fa-graduation-cap'
        }
      ]
    };
  }
};
</script>