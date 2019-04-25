import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
import payment from 'components/payment';
import orderList from 'components/order/list';
import orderDetail from 'components/order/detail';
import ratingOrder from 'components/ratingOrder/ratingOrder'
import complainOrder from 'components/complainOrder/complainOrder'
import addressList from 'components/address/addressList'
import addressAdd from 'components/address/addressAdd'
import shopList from 'common/shopList'
import 'common/stylus/index.styl';
// import axios from 'https://unpkg.com/axios/dist/axios.min.js'
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
// Vue.prototype.$axios = axios;


const routes = [{
  path: '/',
  component: goods
}, {
  path: '/goods',
  component: goods
}, {
  path: '/ratings',
  component: ratings
}, {
  path: '/seller',
  component: seller
}, {
  path: '/payment',
  component: payment
}, {
  path: '/order',
  component: orderList
}, {
    path: '/order/:orderId',
    component: orderDetail
},{
  path:'/ratingOrder/:orderId',
  component:ratingOrder
},
  {
    path:'/complainOrder/:orderId',
    component:complainOrder
  },{
    path:'/address/list',
    component:addressList
  },{
    path:'/address/add',
    component:addressAdd
  },{
    path:'/shopList',
    component:shopList
  }];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});

/* eslint-disable no-new */
window.bvue = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

