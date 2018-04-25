<template lang="pug">
    .content-wrapper
        .container-fluid
            //- Breadcrumbs
            ol.breadcrumb
                li.breadcrumb-item
                    nuxt-link(to="/") Dashboard
                li.breadcrumb-item.active Drivers

            .card
                .card-header
                    nuxt-link.btn.btn-sm.btn-primary(to="/drivers/create")
                        | Create Driver
                .card-body.px-0
                    .table-responsive
                        .text-center.my-2(v-if='fetch.drivers.loading')
                            i.fa.fa-refresh.fa-spin.fa-3x.fa-fw
                        h3.text-center.my-2(v-if='!fetch.drivers.loading && fetch.drivers.data.length === 0')
                            | No Data Found!
                        template(v-if='!fetch.drivers.loading && fetch.drivers.data.length > 0')
                            table_comp(v-bind:per_page="10" classes="table-sm")
                                template(slot="thead")
                                    tr
                                        th S.No#
                                        th Name
                                        th Email
                                        th Registration Number
                                        th Actions
                                template(slot="tbody")
                                    tr(v-for="(item, ind) in fetch.drivers.data")
                                        td {{ ind+1 }}
                                        td {{ item.driverName }}
                                        td {{ item.email }}
                                        td {{ item.regNumber }}
                                        td
                                            nuxt-link.btn.btn-sm.btn-primary(:to="'/drivers/update/'+item.id")
                                                i.fa.fa-edit


</template>

<script>
import { DB } from "~/services/fireinit.js";
import tableComp from "~/components/table_comp.vue";
export default {
  middleware: "accTypeRestrict",
  components: {
    table_comp: tableComp
  },
  created() {
    const self = this;
    DB.ref("Users")
      .orderByChild("accType")
      .equalTo(0)
      .once("value", function(snap) {
        self.fetch.drivers.data = _.values(snap.val());
        self.fetch.drivers.loading = false;
      });
  },
  data() {
    return {
      fetch: {
        drivers: {
          loading: true,
          data: []
        }
      }
    };
  }
};
</script>