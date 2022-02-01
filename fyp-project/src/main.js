import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import Panel from '@/views/Panel'
// import Embed from 'v-video-embed'
import LazyTube from "vue-lazytube";

Vue.config.productionTip = false
Vue.use(LazyTube);
// Vue.use(Embed)
Vue.component('panel', Panel)

sync(store, router)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
