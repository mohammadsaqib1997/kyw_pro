<template lang="pug">
    .content-wrapper
        .container-fluid
            //- Breadcrumbs
            ol.breadcrumb
                li.breadcrumb-item
                    nuxt-link(to="/admin") Dashboard
                li.breadcrumb-item.active Students

            .card
                .card-header
                    nuxt-link.btn.btn-sm.btn-primary(to="/admin/students/create")
                        | Create Student
                .card-body.px-0
                    .table-responsive
                        .text-center.my-2(v-if='fetch.students.loading')
                            i.fa.fa-refresh.fa-spin.fa-3x.fa-fw
                        h3.text-center.my-2(v-if='!fetch.students.loading && fetch.students.data.length === 0')
                            | No Data Found!
                        template(v-if='!fetch.students.loading && fetch.students.data.length > 0')
                            table_comp(v-bind:per_page="10" classes="table-sm")
                                template(slot="thead")
                                    tr
                                        th S.No#
                                        th Name
                                        th Email
                                        th Student ID
                                        th Action
                                template(slot="tbody")
                                    tr(v-for="(item, ind) in fetch.students.data")
                                        td {{ ind+1 }}
                                        td {{ item.name }}
                                        td {{ item.email }}
                                        td {{ item.studentId }}
                                        td
                                          nuxt-link.btn.btn-sm.btn-primary.text-white(v-bind:to="'/admin/students/update/'+item.id")
                                            i.fa.fa-edit


</template>

<script>
import _ from "lodash";
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
  mounted() {
    const self = this;
    DB.ref("Users")
      .orderByChild("accType")
      .equalTo(2)
      .once("value", function(snap) {
        // if the school
        if (self.loginData.accType === 1) {
          let data = _.filter(snap.val(), function(obj) {
            return obj.schoolId === self.loginData.id;
          });
          self.fetch.students.data = data;
          self.fetch.students.loading = false;
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