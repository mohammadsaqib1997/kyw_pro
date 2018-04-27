<template lang="pug">
    .container
        .card.card-login.mx-auto.mt-5
            .card-header Reset Password
            .card-body
                .text-center.mt-4.mb-5
                    h4 Forgot your password?
                    p Enter your email address and we will send you instructions on how to reset your password.
                form(v-on:submit.prevent="")
                    .form-group
                        input.form-control(type="email" aria-describedby="emailHelp" placeholder="Enter email address")
                    button.btn.btn-primary.btn-block(type="submit") Reset Password
                .text-center
                    nuxt-link.d-block.small.mt-3(to="/admin/login") Login Page


</template>

<script>
export default {};
</script>