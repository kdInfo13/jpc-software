import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";

// LightBootstrap plugin
import LightBootstrap from "./light-bootstrap-main";
import moment from 'moment';
import store from './store';
import Tabs from 'vue-tabs-component';

// router setup
import routes from "./routes/routes";

import Vuelidate from 'vuelidate'

import "./registerServiceWorker";
// plugin setup
Vue.use(VueRouter);
Vue.use(LightBootstrap);
Vue.use(Vuelidate)
Vue.use(Tabs)

Vue.filter('formatDate', function(value) {
  if (value) {
      return moment(String(value)).format('MM/DD/YYYY')
  }
});

function isAuthenticated(){
  if(localStorage.getItem('token')){
    return true;
  }else{
    return false;
  }
}
// configure router
const router = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  linkActiveClass: "nav-item active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  var requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (to.path != '/login' && !isAuthenticated()) {
    next({
      name: 'Login'
    });
  } else if (to.path == '/login' && isAuthenticated()) {
    next({
      name: 'Admin'
    });
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  store,
  el: "#app",
  render: (h) => h(App),
  router,
});
