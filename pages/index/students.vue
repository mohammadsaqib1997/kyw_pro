<template lang="pug">
    .content-wrapper
        .container-fluid
            //- Breadcrumbs
            ol.breadcrumb
                li.breadcrumb-item
                    nuxt-link(to="/") Dashboard
                li.breadcrumb-item.active Students

            .card
                .card-body.px-0
                    .table-responsive
                        .text-center.my-2(v-if='fetch.students.loading')
                            i.fa.fa-refresh.fa-spin.fa-3x.fa-fw
                        h3.text-center.my-2(v-if='!fetch.students.loading && fetch.students.data.length === 0')
                            | No Data Found!
                        template(v-if='!fetch.students.loading && fetch.students.data.length > 0')
                            table_comp(v-bind:per_page="10")
                                template(slot="thead")
                                    tr
                                        th S.No#
                                        th Name
                                        th Email
                                        th Student ID
                                template(slot="tbody")
                                    tr(v-for="(item, ind) in fetch.students.data")
                                        td {{ ind+1 }}
                                        td {{ item.name }}
                                        td {{ item.email }}
                                        td {{ item.studentId }}


</template>

<script>
import { mapState } from "vuex";
import { DB } from "~/services/fireinit.js";
import tableComp from "~/components/table_comp.vue";
export default {
  components: {
    table_comp: tableComp
  },
  computed: {
    ...mapState({
      loginData: "userData"
    })
  },
  created() {
    const self = this;
    console.log(self.loginData);
    DB.ref("Users")
      .orderByChild("accType")
      .equalTo(2)
      .once("value", function(snap) {
        // if the school
        if (self.loginData.accType === 1) {
          console.log("School");
        } else if (self.loginData.accType === 4) {
          self.fetch.students.data = _.values(snap.val());
          self.fetch.students.loading = false;
        }
      });
  },
  data() {
    return {
      fetch: {
        students: {
          loading: true,
          data: []
        }
      }
    };
  }
};
</script>