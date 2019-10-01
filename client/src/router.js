import Vue from 'vue';
import Router from 'vue-router';

import VueAxios from 'vue-axios';
import axios from 'axios';

import LoginComponent from '@/components/users/LoginComponent.vue';
import oppDatesComponent from '@/components/opportunity/oppDatesComponent';
import AboutComponent from '@/views/About.vue';

Vue.use(Router);
Vue.use(VueAxios, axios);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'about',
      path: '/about',
      component: AboutComponent
    },
    {
      name: 'login',
      path: '/login',
      component: LoginComponent
    },
    {
      name: 'oppDates',
      path: '/oppDates',
      component: oppDatesComponent
    }
  ]
});
