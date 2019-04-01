import Vue from 'vue';
import Router from 'vue-router';
import Flights from './views/Flights';
import Confirm from './views/Confirm';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/flights/:citys/:date',
      name: 'flights',
      component: Flights,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/flights/:id',
      name: 'confirm',
      component: Confirm,
      props: true,
      meta: {
        keepAlive: false
      }
    }
  ]
});
