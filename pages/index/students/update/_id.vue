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
                .card-body
                    p.text-danger(v-if="form.err && form.err !== ''") {{ form.err }}
                    p.text-success(v-if="form.suc && form.suc !== ''") {{ form.suc }}
                    form(v-on:submit.prevent="submit")
                        .form-group
                            label(for="s_id") Student ID
                            input.form-control(type="text" id="s_id" v-model.trim="s_id" autocomplete="off")
                            p.text-danger.small(v-if="validation.hasError('s_id')") {{ validation.firstError('s_id') }}
                        .form-group
                            label(for="name") Student Name
                            input.form-control(type="text" id="name" v-model.trim="name" autocomplete="off")
                            p.text-danger.small(v-if="validation.hasError('name')") {{ validation.firstError('name') }}
                        .form-group
                            label(for="sel_school") Select School
                            select.form-control(v-model="sel_school")
                                option(value="") Select School
                                option(v-for="school in schools" :value="school.id") {{ school.name }}
                            p.text-danger.small(v-if="validation.hasError('sel_school')") {{ validation.firstError('sel_school') }}
                        .form-group
                            label(for="sel_van") Select Van
                            select.form-control(v-model="sel_van")
                                option(value="") Select Van
                                option(v-for="van in vans" :value="van.id") {{ van.name }}
                            p.text-danger.small(v-if="validation.hasError('sel_van')") {{ validation.firstError('sel_van') }}
                        .form-group
                            label(for="email") Student Email
                            input.form-control(type="email" id="email" v-model.trim="email" autocomplete="off")
                            i.fa.fa-spinner.fa-spin.p-1(v-if="validation.isValidating('email')")
                            p.text-danger.small(v-if="validation.hasError('email')") {{ validation.firstError('email') }}
                        .form-group
                            label(for="password") Student Password
                            small.text-info.d-block Default Password: 12345678
                            input.form-control(type="password" id="password" v-model="password")
                            p.text-danger.small(v-if="validation.hasError('password')") {{ validation.firstError('password') }}
                        .form-group
                            button.btn.btn-primary(v-if="form.loading" disabled)
                                i.fa.fa-refresh.fa-spin
                            button.btn.btn-primary(v-else) Update
                    


</template>

<script>
import firebase, { DB } from "~/services/fireinit.js";
import _ from "lodash";

import Promise from "bluebird";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;

export default {
  async asyncData({ params, redirect }, callback) {
    await DB.ref("Users")
      .child(params.id)
      .once("value", async snap => {
        if (snap.val() !== null) {
          let school_snap = await DB.ref("Users")
            .orderByChild("accType")
            .equalTo(1)
            .once("value");

          let van_snap = await DB.ref("Users")
            .orderByChild("accType")
            .equalTo(0)
            .once("value");

          let schoolMap = await Promise.all(
            _.map(school_snap.val(), async o => {
              return {
                id: o.id,
                name: o.schoolName
              };
            })
          );

          let vanMap = await Promise.all(
            _.map(van_snap.val(), async o => {
              return {
                id: o.id,
                name: o.driverName,
                reg_num: o.regNumber
              };
            })
          );

          callback(null, {
            schools: schoolMap,
            vans: vanMap,
            update_id: params.id,

            s_id: snap.val().studentId,
            name: snap.val().name,
            sel_school: snap.val().schoolId,
            sel_van: snap.val().vanId,
            email: snap.val().email,
            password: snap.val().pass
          });
        } else {
          redirect("/students");
        }
      });
  },
  data() {
    return {
      form: {
        loading: false,
        suc: "",
        err: ""
      },
      schools: [],
      vans: [],

      update_id: "",
      s_id: "",
      name: "",
      sel_school: "",
      sel_van: "",
      email: "",
      password: "12345678"
    };
  },
  validators: {
    s_id: value => {
      return Validator.value(value)
        .required()
        .digit()
        .minLength(1)
        .maxLength(6);
    },
    name: value => {
      return Validator.value(value)
        .required()
        .minLength(3)
        .maxLength(50);
    },
    sel_school: value => {
      return Validator.value(value).required();
    },
    sel_van: value => {
      return Validator.value(value).required();
    },
    email: function(value) {
      const self = this;
      return Validator.value(value)
        .required()
        .email()
        .maxLength(35)
        .custom(function() {
          if (!Validator.isEmpty(value)) {
            return Promise.delay(1000).then(async () => {
              const snap = await DB.ref("Users")
                .orderByChild("email")
                .equalTo(value)
                .once("value");

              if (
                _.find(snap.toJSON(), o => {
                  return o.id !== self.update_id;
                })
              ) {
                return "Already taken!";
              }
            });
          }
        });
    },
    password: value => {
      return Validator.value(value)
        .required()
        .minLength(6)
        .maxLength(15);
    }
  },
  methods: {
    submit() {
      const self = this;
      self.form.loading = true;
      self.form.suc = "";
      self.form.err = "";
      this.$validate().then(function(success) {
        if (success) {
          let pushRef = DB.ref("Users").push();
          DB.ref("Users/" + self.update_id).update(
            {
              email: self.email,
              pass: self.password,
              updatedAt: firebase.database.ServerValue.TIMESTAMP,
              name: self.name,
              studentId: self.s_id,
              schoolId: self.sel_school,
              vanId: self.sel_van
            },
            err => {
              if (err) {
                self.form.err = err.message;
                self.form.loading = false;
              } else {
                self.form.suc = "Successfully updated student.";
                self.form.loading = false;
                setTimeout(() => {
                  self.form.suc = "";
                }, 1500);
              }
            }
          );
        } else {
          self.form.loading = false;
        }
      });
    }
  }
};
</script>