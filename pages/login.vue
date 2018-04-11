<template lang="pug">
    .container
        .card.card-login.mx-auto.mt-5
            .card-header Login
            .card-body
                form(v-on:submit.prevent="submit")
                    p.text-danger(v-if="form.err && form.err !== ''") {{ form.err }}
                    p.text-success(v-if="form.suc && form.suc !== ''") {{ form.suc }}
                    .form-group
                        label Email address
                        input.form-control(type="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="email")
                    .form-group
                        label Password
                        input.form-control(type="password" placeholder="Password" v-model="password")
                    .form-group
                        .form-check
                            label.form-check-label
                                input.form-check-input(type="checkbox")
                                | &nbsp;Remember Password
                    button.btn.btn-primary.btn-block(type="submit" v-if="!form.loading") Login
                    button.btn.btn-primary.btn-block(type="button" v-else disabled)
                      i.fa.fa-refresh.fa-spin
                .text-center
                    nuxt-link.d-block.small.mt-3(to="/forgot-password") Forgot Password?


</template>

<script>
import { auth } from '~/services/fireinit.js'
export default {
  layout: "login_layout",
  data() {
    return {
      form: {
        suc: "",
        err: "",
        loading: false
      },
      email: "",
      password: ""
    };
  },
  methods: {
    submit() {
      const self = this;
      self.form.err = "";
      self.form.suc = "";
      if (self.email !== "" && self.password !== "") {
        self.form.loading = true;
        auth
          .signInWithEmailAndPassword(self.email, self.password)
          .then(function() {
            self.$store.dispatch('autoSignIn', auth.currentUser);
            self.form.loading = false;
            self.$router.push("/");
          })
          .catch(function(error) {
            var errorCode = error.code;
            self.form.err = error.message;
            self.form.loading = false;
          });
      } else {
        self.form.err = "Some Field Empty!";
      }
    }
  }
};
</script>