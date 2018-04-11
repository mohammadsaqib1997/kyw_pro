<template lang="pug">
    nav#mainNav.navbar.navbar-expand-lg.navbar-dark.bg-dark.static-nav
        a.navbar-brand(href='index.html') Start Bootstrap
        button.navbar-toggler.navbar-toggler-right(type='button', data-toggle='collapse', data-target='#navbarResponsive', aria-controls='navbarResponsive', aria-expanded='false', aria-label='Toggle navigation')
            span.navbar-toggler-icon
        #navbarResponsive.collapse.navbar-collapse
            //- Side Nav start here
            ul#navBarSide.navbar-nav.navbar-sidenav
                li.nav-item(data-toggle='tooltip', data-placement='right', v-for="item in nav_list_item" v-bind:title='item.title')
                    nuxt-link.nav-link(v-bind:to='item.link')
                        i.fa.fa-fw.fa-dashboard
                        span.nav-link-text &nbsp;{{ item.title }}

            //- Top Bar start here
            ul.navbar-nav.ml-auto
                li.nav-item.dropdown
                    a#messagesDropdown.nav-link.dropdown-toggle.mr-lg-2(href='#', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                        i.fa.fa-fw.fa-envelope
                        span.d-lg-none
                            | &nbsp;Messages&nbsp;
                            span.badge.badge-pill.badge-primary 12 New
                        span.indicator.text-primary.d-none.d-lg-block
                            i.fa.fa-fw.fa-circle
                    .dropdown-menu(aria-labelledby='messagesDropdown')
                        h6.dropdown-header New Messages:
                        .dropdown-divider
                        a.dropdown-item(href='#')
                            strong David Miller
                            span.small.float-right.text-muted 11:21 AM
                            .dropdown-message.small
                                | Hey there! This new version of SB Admin is pretty awesome! These messages clip off when they reach the end of the box so they don't overflow over to the sides!
                        .dropdown-divider
                        a.dropdown-item(href='#')
                            strong Jane Smith
                            span.small.float-right.text-muted 11:21 AM
                            .dropdown-message.small
                                | I was wondering if you could meet for an appointment at 3:00 instead of 4:00. Thanks!
                        .dropdown-divider
                        a.dropdown-item(href='#')
                            strong John Doe
                            span.small.float-right.text-muted 11:21 AM
                            .dropdown-message.small
                                | I've sent the final files over to you for review. When you're able to sign off of them let me know and we can discuss distribution.
                        .dropdown-divider
                        a.dropdown-item.small(href='#') View all messages
                li.nav-item.dropdown
                    a#alertsDropdown.nav-link.dropdown-toggle.mr-lg-2(href='#', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                        i.fa.fa-fw.fa-bell
                        span.d-lg-none
                            | &nbsp;Alerts&nbsp;
                            span.badge.badge-pill.badge-warning 6 New
                        span.indicator.text-warning.d-none.d-lg-block
                            i.fa.fa-fw.fa-circle
                    .dropdown-menu(aria-labelledby='alertsDropdown')
                        h6.dropdown-header New Alerts:
                        .dropdown-divider
                        a.dropdown-item(href='#')
                            span.text-success
                            strong
                                i.fa.fa-long-arrow-up.fa-fw
                                | Status Update
                            span.small.float-right.text-muted 11:21 AM
                            .dropdown-message.small This is an automated server response message. All systems are online.
                        .dropdown-divider
                        a.dropdown-item(href='#')
                            span.text-danger
                            strong
                                i.fa.fa-long-arrow-down.fa-fw
                                | Status Update
                            span.small.float-right.text-muted 11:21 AM
                            .dropdown-message.small This is an automated server response message. All systems are online.
                        .dropdown-divider
                        a.dropdown-item(href='#')
                            span.text-success
                            strong
                                i.fa.fa-long-arrow-up.fa-fw
                                | Status Update
                            span.small.float-right.text-muted 11:21 AM
                            .dropdown-message.small This is an automated server response message. All systems are online.
                        .dropdown-divider
                        a.dropdown-item.small(href='#') View all alerts
                li.nav-item
                    form.form-inline.my-2.my-lg-0.mr-lg-2
                        .input-group
                            input.form-control(type='text', placeholder='Search for...')
                            span.input-group-append
                            button.btn.btn-primary(type='button')
                                i.fa.fa-search
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
  mounted() {
    $(function() {
      $("body").on("click", "#sidenavToggler", function(e) {
        e.preventDefault();
        $("body").toggleClass("sidenav-toggled");
      });
    });
  },
  beforeDestroy() {
    $(function() {
      $("body").off("click", "#sidenavToggler");
    });
  },
  data() {
    return {
      nav_list_item: [
        {
          title: "Dashboard",
          link: "/"
        },
        {
          title: "Drivers",
          link: "/drivers"
        },
        {
          title: "Schools",
          link: "/schools"
        },
        {
          title: "Students",
          link: "/students"
        }
      ]
    };
  }
};
</script>