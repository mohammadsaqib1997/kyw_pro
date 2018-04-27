<template lang="pug">
    .content-wrapper
        .container-fluid
            //- Breadcrumbs
            ol.breadcrumb
                li.breadcrumb-item
                    nuxt-link(to="/admin/") Dashboard
                li.breadcrumb-item
                    nuxt-link(to="/admin/drivers") Drivers
                li.breadcrumb-item.active Create New Driver

            .card
                .card-body
                    p.text-danger(v-if="form.err && form.err !== ''") {{ form.err }}
                    p.text-success(v-if="form.suc && form.suc !== ''") {{ form.suc }}
                    form(v-on:submit.prevent="submit")
                        .form-group
                            label(for="name") Name
                            input.form-control(type="text" id="name" v-model.trim="name" autocomplete="off")
                            p.text-danger.small(v-if="validation.hasError('name')") {{ validation.firstError('name') }}
                        .form-group
                            label(for="cnic") CNIC
                            input.form-control(type="text" id="cnic" v-model.trim="cnic" autocomplete="off")
                            p.text-danger.small(v-if="validation.hasError('cnic')") {{ validation.firstError('cnic') }}
                        .form-group
                            label(for="license") License
                            input.form-control(type="text" id="license" v-model.trim="license" autocomplete="off")
                            p.text-danger.small(v-if="validation.hasError('license')") {{ validation.firstError('license') }}
                        .form-group
                            label(for="model") Model Year
                            input.form-control(type="text" id="model" v-model.trim="model" autocomplete="off")
                            p.text-danger.small(v-if="validation.hasError('model')") {{ validation.firstError('model') }}
                        .form-group
                            label(for="reg_number") Registration Number
                            input.form-control(type="text" id="reg_number" v-model.trim="reg_number" autocomplete="off")
                            p.text-danger.small(v-if="validation.hasError('reg_number')") {{ validation.firstError('reg_number') }}
                        .form-group
                            label(for="sel_school") Select School
                            select.form-control(v-model="sel_school")
                                option(value="") Select School
                                option(v-for="school in schools" :value="school.id") {{ school.name }}
                            p.text-danger.small(v-if="validation.hasError('sel_school')") {{ validation.firstError('sel_school') }}
                        .form-group
                            label(for="email") Email
                            input.form-control(type="email" id="email" v-model.trim="email" autocomplete="off")
                            i.fa.fa-spinner.fa-spin.p-1(v-if="validation.isValidating('email')")
                            p.text-danger.small(v-if="validation.hasError('email')") {{ validation.firstError('email') }}
                        .form-group
                            label(for="password") Password
                            small.text-info.d-block Default Password: 12345678
                            input.form-control(type="password" id="password" v-model="password")
                            p.text-danger.small(v-if="validation.hasError('password')") {{ validation.firstError('password') }}
                        .form-group
                            button.btn.btn-primary(v-if="form.loading" disabled)
                                i.fa.fa-refresh.fa-spin
                            button.btn.btn-primary(v-else) Create
</template>
<script>
import firebase, { DB } from "~/services/fireinit.js";
import _ from "lodash";
import Promise from "bluebird";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;
export default {
  middleware: "accTypeRestrict",
  async asyncData({ params }, callback) {
    let school_snap = await DB.ref("Users")
      .orderByChild("accType")
      .equalTo(1)
      .once("value");

    let dataMap = await Promise.all(
      _.map(school_snap.val(), async o => {
        return {
          id: o.id,
          name: o.schoolName
        };
      })
    );

    callback(null, { schools: dataMap });
  },
  data() {
    return {
      form: {
        loading: false,
        suc: "",
        err: ""
      },
      schools: [],

      name: "",
      cnic: "",
      license: "",
      model: "",
      reg_number: "",
      sel_school: "",
      email: "",
      password: "12345678"
    };
  },
  validators: {
    name: value => {
      return Validator.value(value)
        .required()
        .minLength(3)
        .maxLength(50);
    },
    cnic: value => {
      return Validator.value(value)
        .required()
        .digit()
        .minLength(13)
        .maxLength(20);
    },
    license: value => {
      return Validator.value(value)
        .required()
        .minLength(4)
        .maxLength(20);
    },
    model: value => {
      return Validator.value(value)
        .required()
        .digit()
        .between(1980, new Date().getFullYear());
    },
    reg_number: value => {
      return Validator.value(value)
        .required()
        .minLength(7)
        .maxLength(8);
    },
    sel_school: value => {
      return Validator.value(value).required();
    },
    email: value => {
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
              if (snap.val() !== null) {
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
          pushRef.set(
            {
              accType: 0,
              email: self.email,
              id: pushRef.key,
              pass: self.password,
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              cnic: self.cnic,
              driverName: self.name,
              license: self.license,
              model: self.model,
              regNumber: self.reg_number,
              school: self.sel_school
            },
            err => {
              if (err) {
                self.form.err = err.message;
                self.form.loading = false;
              } else {
                self.resetForm();
                self.form.suc = "Successfully created driver.";
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
    resetForm() {
      const self = this;

      self.name = "";
      self.email = "";
      self.password = "12345678";
      self.cnic = "";
      self.license = "";
      self.model = "";
      self.reg_number = "";
      self.sel_school = "";

      self.validation.reset();
    }
  }
};
</script>


