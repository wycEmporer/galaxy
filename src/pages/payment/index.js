import Vue from 'vue';
import App from './App';
import router from './router.js';
import FontUtils from '@/utils/FontUtils';
import fetch from '@/utils/ApiUtils';
import { addCommas, padZero } from '@/utils/NumberUtils';
import store from '@/store/index';
import FastClick from 'fastclick';
import 'mint-ui/lib/style.css';
import base64 from 'js-base64';

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

FontUtils.init();

Vue.prototype.$http = fetch;
Vue.prototype.$Base64 = base64.Base64;
Vue.filter('addCommas', addCommas);
Vue.filter('padZero', padZero);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
