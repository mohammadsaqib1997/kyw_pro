<template lang="pug">
    .content-wrapper
        .container-fluid
            //- Breadcrumbs
            ol.breadcrumb
                li.breadcrumb-item
                    nuxt-link(to="/admin") Dashboard
                li.breadcrumb-item.active Schools

            .card
                .card-header
                    nuxt-link.btn.btn-sm.btn-primary(to="/admin/schools/create")
                        | Create School
                .card-body.px-0
                    .table-responsive
                        .text-center.my-2(v-if='fetch.schools.loading')
                            i.fa.fa-refresh.fa-spin.fa-3x.fa-fw
                        h3.text-center.my-2(v-if='!fetch.schools.loading && fetch.schools.data.length === 0')
                            | No Data Found!
                        template(v-if='!fetch.schools.loading && fetch.schools.data.length > 0')
                            table_comp(v-bind:per_page="10" classes="table-sm")
                                template(slot="thead")
                                    tr
                                        th S.No#
                                        th School Name
                                        th Email
                                        th School Address
                                        th Actions
                                template(slot="tbody")
                                    tr(v-for="(item, ind) in fetch.schools.data")
                                        td {{ ind+1 }}
                                        td {{ item.schoolName }}
                                        td {{ item.email }}
                                        td {{ item.schoolAddress }}
                                        td
                                            nuxt-link.btn.btn-sm.btn-primary(:to="'/admin/schools/update/'+item.id")
                                                i.fa.fa-edit


</template>

<script>
import { DB } from "~/services/fireinit.js";
import tableComp from "~/components/table_comp.vue";
import _ from "lodash";
export default {
  middleware: "accTypeRestrict",
  components: {
    table_comp: tableComp
  },
  created() {
    const self = this;
    DB.ref("Users")
      .orderByChild("accType")
      .equalTo(1)
      .once("value", function(snap) {
        self.fetch.schools.data = _.reverse(_.values(snap.val()));
        self.fetch.schools.loading = false;
      });
  },
  data() {
    return {
      fetch: {
        schools: {
          loading: true,
          data: []
        }
      }
    };
  }
};
</script>