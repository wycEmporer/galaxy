import Vue from 'vue';
import Vuex from 'vuex';
import { SearchForm } from './modules/SearchForm';
import { FlightInfo } from './modules/flightInfo';
import { MyTripList } from './modules/triplist';

Vue.use(Vuex);

export default function (state = {}) {
  return new Vuex.Store({
    modules: {
      SearchForm: SearchForm(state.SearchForm),
      FlightInfo,
      MyTripList,
    }
  });
};
