module.exports = {
  head: {
    title: 'SB Admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      { name: 'author', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/assets/vendor/bootstrap/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/assets/vendor/font-awesome/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: '/assets/css/sb-admin.min.css' },
    ],
    script: [
      { src: '/assets/vendor/jquery/jquery.min.js' },
      { src: '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js' },
      { src: '/assets/vendor/jquery-easing/jquery.easing.min.js' },
      { src: '/assets/js/sb-admin.min.js' },
    ]
  },
  mode: 'spa',
  loading: '~/components/loading.vue',
  loadingIndicator: '~/assets/loadingIndicator.html',
  plugins: ['~/plugins/s-vue-validator.js'],
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
}
