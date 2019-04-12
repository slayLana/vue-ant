import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/mock'
import store from './store'
import Viser from 'viser-vue'
import PouchDB from 'pouchdb'
import { message, Form } from 'ant-design-vue'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$message = message
Vue.prototype.$axios = axios
Vue.prototype.$form = Form
Vue.use(Viser)

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    const db = new PouchDB('admindb')
    db.get('currUser').then((doc: any) => {
      this.$store.commit('account/setuser', doc.user)
    })
  }
}).$mount('#app')
