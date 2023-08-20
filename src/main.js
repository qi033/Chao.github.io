import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.resetSetItem = function (key, newVal) {
   if (key === 'datyoua') {
 
       // 创建一个StorageEvent事件
       var newStorageEvent = document.createEvent('StorageEvent');
       const storage = {
           setItem: function (k, val) {
               sessionStorage.setItem(k, val);
 
               // 初始化创建的事件
               newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
 
               // 派发对象
               window.dispatchEvent(newStorageEvent)
           }
       }
       return storage.setItem(key, newVal);
   }
}