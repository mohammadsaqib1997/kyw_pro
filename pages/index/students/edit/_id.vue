<template lang="pug">
    .content-wrapper
        .container-fluid
            //- Breadcrumbs
            ol.breadcrumb
                li.breadcrumb-item
                    nuxt-link(to="/") Dashboard
                li.breadcrumb-item
                    nuxt-link(to="/students") Students
                li.breadcrumb-item.active Select Student

            .card
                .card-body.px-0
                    


</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";
import { DB } from "~/services/fireinit.js";
export default {
  asyncData({ params }, callback) {
      DB.ref('Users').child(params.id).once('value', snap => {
          console.log(snap.val())
          callback(null, {})
      })
  },
  computed: {
    ...mapState({
      loginData: "userData"
    })
  },
  created() {
    const self = this;
  },
  data() {
    return {};
  }
};
</script>