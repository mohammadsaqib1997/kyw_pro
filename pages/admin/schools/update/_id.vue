<template lang="pug">
    .content-wrapper
        .container-fluid
            //- Breadcrumbs
            ol.breadcrumb
                li.breadcrumb-item
                    nuxt-link(to="/admin") Dashboard
                li.breadcrumb-item
                    nuxt-link(to="/admin/schools") Schools
                li.breadcrumb-item.active Update School

            .card
                .card-body
                    p.text-danger(v-if="form.err && form.err !== ''") {{ form.err }}
                    p.text-success(v-if="form.suc && form.suc !== ''") {{ form.suc }}
                    form(v-on:submit.prevent="submit")
                        .form-group
                            label(for="s_name") School Name
                            input.form-control(type="text" id="s_name" v-model.trim="s_name" autocomplete="off")
                            p.text-danger.small(v-if="validation.hasError('s_name')") {{ validation.firstError('s_name') }}
                        .form-group
                            label(for="s_address") School Address
                            input.form-control(type="text" id="s_address" v-model.trim="s_address" autocomplete="off")
                            p.text-danger.small(v-if="validation.hasError('s_address')") {{ validation.firstError('s_address') }}
                        .form-group
                            label(for="email") School Email
                            input.form-control(type="email" id="email" v-model.trim="email" autocomplete="off")
                            i.fa.fa-spinner.fa-spin.p-1(v-if="validation.isValidating('email')")
                            p.text-danger.small(v-if="validation.hasError('email')") {{ validation.firstError('email') }}
                        .form-group
                            label(for="password") School Password
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
import _ from 'lodash'

import Promise from "bluebird";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;

export default {
  middleware: "accTypeRestrict",
  async asyncData({ params, redirect }, callback) {
    await DB.ref("Users")
      .child(params.id)
      .once("value", snap => {
        if (snap.val() !== null) {
          callback(null, {
            update_id: params.id,
            s_name: snap.val().schoolName,
            s_address: snap.val().schoolAddress,
            email: snap.val().email,
            password: snap.val().pass
          });
        } else {
          redirect("/schools");
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

      update_id: "",
      s_name: "",
      s_address: "",
      email: "",
      password: "12345678"
    };
  },
  validators: {
    s_name: value => {
      return Validator.value(value)
        .required()
        .minLength(3)
        .maxLength(50);
    },
    s_address: value => {
      return Validator.value(value)
        .required()
        .minLength(3)
        .maxLength(100);
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
              if (_.find(snap.toJSON(), (o) => { return o.id !== self.update_id })) {
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
          let pushRef = DB.ref("Users/"+self.update_id);
          pushRef.update(
            {
              email: self.email,
              pass: self.password,
              schoolAddress: self.s_address,
              schoolName: self.s_name,
              updatedAt: firebase.database.ServerValue.TIMESTAMP
            },
            err => {
              if (err) {
                self.form.err = err.message;
                self.form.loading = false;
              } else {
                self.form.suc = "Successfully updated school.";
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
    },
  }
};
</script>