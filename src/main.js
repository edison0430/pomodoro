import Vue from 'vue'
import App from './App.vue'
import VCharts from 'v-charts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
Vue.use(VCharts);
Vue.config.productionTip = false;

export const eventBus = new Vue();
import { store } from './store.js'; 

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
