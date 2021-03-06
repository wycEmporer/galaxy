import Vue from 'vue';
import Router from 'vue-router';
import Trip from './views/Trip';
import TripDetail from './views/TripDetail';
import CancelTrip from './views/CancelTrip';
import ChangeTrip from './views/ChangeTrip';
import Tripback from './views/back';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/trip',
      name: 'trip',
      component: Trip
    },
    {
      path: '/trip/detail',
      name: 'tripdetail',
      component: TripDetail
    },
    {
      path: '/trip/canceltrip/:tripId',
      props: true,
      name: 'CancelTrip',
      component: CancelTrip
    },
    {
      path: '/trip/changetrip/:tripId',
      props: true,
      name: 'ChangeTrip',
      component: ChangeTrip
    },
    {
      path: '/tripback',
      component: Tripback
    },
  ]
});
