// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Modal from './plugins/modal.js';
import LocalStorage from './plugins/localStorage.js';
import { VueMaskDirective } from 'v-mask';

Vue.config.productionTip = false;
Vue.use(Modal);
Vue.use(LocalStorage);
Vue.directive('mask', VueMaskDirective);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
