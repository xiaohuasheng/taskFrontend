// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

// 设置axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]

// 然后再修改原型链
Vue.prototype.$axios = axios
Vue.prototype.$layer = layer(Vue)
// Vue.prototype.$layer = layer({
//   // 目前只有一项，即msg方法的默认消失时间，单位：秒
//   msgtime: 3
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
