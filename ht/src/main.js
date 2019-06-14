// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import qs from 'qs'
Vue.prototype.$qs=qs

Vue.prototype.ev=new Vue();
// pc端框架
import { Button, Select } from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
// 
import common from './components/common/index'
for(let i in common){
  Vue.comment(i,common[i])
}
import 'animate.css'

//jqeury
import jquery from 'jquery'
Vue.prototype.$=jquery

import Filter from './filter'
for(let f in Filter){
  Vue.filter(f,Filter[f])
}
// 数据
import axios from 'axios'
Vue.prototype.$http=axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
