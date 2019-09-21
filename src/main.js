// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import Viser from 'viser-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Dialog } from 'vant'
import 'vant/lib/index.css'
import { Toast } from 'vant';
import { SwipeCell } from 'vant';
import { Field } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { Row, Col } from 'vant';
import { Popup } from 'vant';
import { DatetimePicker } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { Divider } from 'vant';
import { Tag } from 'vant';
import { AddressEdit } from 'vant';
import backItem from './components/Button/Back'
import { Image } from 'vant';

Vue.use(Image);
Vue.use(AddressEdit);
Vue.use(Tag);
Vue.use(Divider);
Vue.use(Collapse).use(CollapseItem);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Row).use(Col);
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Field);
Vue.use(SwipeCell);
Vue.use(Toast);
Vue.use(Vant)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(Viser)
Vue.use(VueAxios, axios)
Vue.use(Dialog)
Vue.use(backItem)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { 
    App,
    Vant,
    Viser,
    VueAxios, 
    axios,
    Dialog,
    backItem
   },
  template: '<App/>'
})
