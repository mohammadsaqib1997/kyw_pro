<template lang="pug">
    .content-wrapper
        .container-fluid
            //- Breadcrumbs
            ol.breadcrumb
                li.breadcrumb-item.active Dashboard
            
            .row
                .col-xl-3.col-sm-6.mb-3
                    .card.bg-primary.text-white.o-hidden.h-100
                        .card-body
                            .card-body-icon
                                i.fa.fa-fw.fa-building
                            .mr-5
                                h3 Schools
                                    br
                                    template(v-if="!schools.loading") {{ schools.length }}
                                    template(v-else)
                                        i.fa.fa-refresh.fa-spin
                        nuxt-link.card-footer.text-white.small.z-1(to="/admin/schools")
                            span View Details
                .col-xl-3.col-sm-6.mb-3
                    .card.bg-warning.text-white.o-hidden.h-100
                        .card-body
                            .card-body-icon
                                i.fa.fa-fw.fa-car
                            .mr-5
                                h3 Drivers
                                    br
                                    template(v-if="!drivers.loading") {{ drivers.length }}
                                    template(v-else)
                                        i.fa.fa-refresh.fa-spin
                        nuxt-link.card-footer.text-white.small.z-1(to="/admin/drivers")
                            span View Details

                .col-xl-3.col-sm-6.mb-3
                    .card.bg-info.text-white.o-hidden.h-100
                        .card-body
                            .card-body-icon
                                i.fa.fa-fw.fa-graduation-cap
                            .mr-5
                                h3 Students
                                    br
                                    template(v-if="!students.loading") {{ students.length }}
                                    template(v-else)
                                        i.fa.fa-refresh.fa-spin
                        nuxt-link.card-footer.text-white.small.z-1(to="/admin/students")
                            span View Details
</template>

<script>
import { DB } from "~/services/fireinit.js";
import _ from "lodash";
export default {
  mounted() {
    const self = this;
    DB.ref("Users").once("value", snap => {
      if (snap.val() != null) {

        // Driver filter
        self.drivers.length = _.size(
          _.filter(snap.val(), o => {
            return o.accType === 0;
          })
        );
        self.drivers.loading = false;

        // School filter
        self.schools.length = _.size(
          _.filter(snap.val(), o => {
            return o.accType === 1;
          })
        );
        self.schools.loading = false;

        // Student filter
        self.students.length = _.size(
          _.filter(snap.val(), o => {
            return o.accType === 2;
          })
        );
        self.students.loading = false;
      } else {
        self.schools.loading = false;
        self.students.loading = false;
        self.drivers.loading = false;
      }
    });
  },
  data() {
    return {
      schools: {
        length: 0,
        loading: true
      },
      students: {
        length: 0,
        loading: true
      },
      drivers: {
        length: 0,
        loading: true
      }
    };
  }
};
</script>