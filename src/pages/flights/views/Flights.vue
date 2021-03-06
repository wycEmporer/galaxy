<template>
  <div class="flights">
    <SearchCity v-if="showCityLayer"/>
    <Calendar v-if="showCalendarLayer" />
    <SearchPassenger v-if="showPassengerLayer" />

    <div v-show="showFlightList">
      <SearchForm v-if="showSearchModel" @closeSearchModel="closeSearchModel" @searchFlight="getSearchFlightsList"/>
      <FlightsHeader v-else @searchModel="searchModel" />
      <FlightsSort/>
      <FlightsList :advImagelist="advImagelist" v-if="showFlightList"/>
    </div>
    <FlightsFilter v-if="!showFlightList" />

  </div>
</template>
<script>
import FlightsHeader from './FlightsHeader.vue';
import FlightsSort from './FlightsSort.vue';
import FlightsList from './FlightsList.vue';
import FlightsFilter from './FlightsFilter.vue';
import { getSearchFlightsURLStirng } from '@/constants/ApiConstants';
import { Toast, Indicator } from 'mint-ui';
import { getYearMonthDayString } from '@/utils/DateFormatUtils';
import { mapMutations, mapState, mapActions } from 'vuex';
import {
  SAVE_FLIGHTINFO,
  RESET_FILTER_OPTIONS,
  SET_SEARCH_FORM,
  CHANGE_WHICH_FLIGHTS
  // SET_CITY,
  // SET_DATE,
  // SET_PASSENGER,
  // SET_CLASS,
} from '@/store/type';

export default {
  name: 'flights',
  components: {
    FlightsHeader,
    FlightsSort,
    FlightsList,
    SearchForm: () => import('./SearchForm'),
    FlightsFilter,
    SearchCity: () => import('@/components/SearchCity'),
    Calendar: () => import('@/components/Calendar'),
    SearchPassenger: () => import('@/components/SearchPassenger')
  },
  data () {
    return {
      advImagelist: [],
      // showFlightList: true,
      showSearchModel: false,
      showFilter: false,
    };
  },
  computed: {
    ...mapState({
      // cityType: 0, // 出发地， 目的地
      // dateType: 0, //  去程 时间，回程时间
      tripType: (state) => state.SearchForm.tripType,
      selectedCitys: (state) => state.SearchForm.selectedCitys,
      departDate: (state) => state.SearchForm.departDate,
      returnDate: (state) => state.SearchForm.returnDate,
      passengers: (state) => state.SearchForm.passengers,
      flightClass: (state) => state.SearchForm.flightClass,
      showCityLayer: (state) => state.SearchForm.showCityLayer,
      showCalendarLayer: (state) => state.SearchForm.showCalendarLayer,
      showPassengerLayer: (state) => state.SearchForm.showPassengerLayer
    }),
    flightsDataList () {
      return this.$store.getters.flightsDataList || [];
    },
    showFlightList () {
      return !(this.flightsDataList.length !== 0 && this.showFilter);
    }
  },
  created () {
    const searchForm = this.urlToSearchParmas(this.$route);
    this.SET_SEARCH_FORM(searchForm).then(() => {
      this.getSearchFlightsList();
    })
  },
  methods: {
    ...mapMutations([SAVE_FLIGHTINFO, CHANGE_WHICH_FLIGHTS]),
    ...mapActions([RESET_FILTER_OPTIONS, SET_SEARCH_FORM]),
    closeSearchModel () {
      this.showSearchModel = false;
    },
    searchModel () {
      this.showSearchModel = true;
    },
    getSearchFlightsList () {
      Indicator.open({
        spinnerType: 'fading-circle',
        text: 'Searching for lowest price flight.'
      });
      this.advImagelist = [
        require('../images/1.png'),
        require('../images/2.png'),
        require('../images/3.png'),
        require('../images/1.png')
      ];
      let url = `${getSearchFlightsURLStirng}?from=${this.selectedCitys[0].iata}&to=${this.selectedCitys[1].iata}&adults=${this.passengers.adult}&childs=${this.passengers.child}&baby=${this.passengers.infant}&cabinClass=${this.flightClass}&tripType=${this.tripType}&departDate=${getYearMonthDayString(this.departDate)}${this.tripType === 1 ? `&returnDate=${getYearMonthDayString(this.returnDate)}` : ''}&airline=&carrier=`;
      this.$http(url, {
        headers: {
          'x-Device': 'mobile'
        }
      }).then(res => {
        Indicator.close();
        this.SAVE_FLIGHTINFO(res);
        this.RESET_FILTER_OPTIONS();
        // 设置默认显示去程
        this.CHANGE_WHICH_FLIGHTS(0)
        if (res.success) {

        } else {
          Toast(res.msg);
          // this.SAVE_FLIGHTINFO(res);
          // this.RESET_FILTER_OPTIONS();
        }
      }).catch(err => {
        Indicator.close();
        Toast(err);
      });
    },
    urlToSearchParmas (to) {
      const reg = /(20\d{2}-\d{2}-\d{2})(-(20\d{2}-\d{2}-\d{2}))?/g;
      const dateArray = reg.exec(to.params.date) || [];
      const departDate = dateArray[1] || new Date();
      const returnDate = dateArray[3] || departDate;
      const cityArray = to.params.citys.split('-');
      return {
        tripType: dateArray[3] ? 1 : 0,
        from: {
          iata: cityArray[0] || 'DEL'
        },
        to: {
          iata: cityArray[1] || 'BOM'
        },
        departDate: new Date(departDate),
        returnDate: new Date(returnDate),
        passengers: {
          adult: parseInt(to.query.adults) || 1,
          child: parseInt(to.query.childs) || 0,
          infant: parseInt(to.query.infants) || 0
        },
        flightClass: to.query.cabinClass || 'Economy'
      }
    },
    diffSearchParams (next) {
      return !(next.tripType === this.tripType &&
        next.from.iata === this.selectedCitys[0].iata &&
        next.to.iata === this.selectedCitys[1].iata &&
        getYearMonthDayString(next.departDate) === getYearMonthDayString(this.departDate) &&
        getYearMonthDayString(next.returnDate) === getYearMonthDayString(this.returnDate) &&
        next.passengers.adult === this.passengers.adult &&
        next.passengers.child === this.passengers.child &&
        next.passengers.infant === this.passengers.infant &&
        next.flightClass === this.flightClass
      )
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.hash.indexOf('filter') > -1) {
        vm.showFilter = true;
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.CHANGE_WHICH_FLIGHTS(0);
    next();
  },
  watch: {
    $route (to, from) {
      // 根据路由名称判断是否需要走 这里
      if (to.name !== 'flights') return;
      // filter 页
      if (to.hash.indexOf('filter') > -1) {
        this.showFilter = true;
      } else {
        this.showFilter = false;
      }
      // 如果不存在 departid ，设置
      if (!to.query.departid) {
        this.CHANGE_WHICH_FLIGHTS(0);
      } else {
        this.CHANGE_WHICH_FLIGHTS(1);
      }
      // if (to.fullPath.replace(/#\w*/, '') !== from.fullPath.replace(/#\w*/, '')) {
      const searchForm = this.urlToSearchParmas(to);
      // 如果参数不同请求
      if (this.diffSearchParams(searchForm)) {
        this.SET_SEARCH_FORM(searchForm).then(res => {
          this.getSearchFlightsList();
        })
      }
      // }
    }
  }
};
</script>
<style lang="scss" scoped>
.flights{
  position: relative;
}
</style>
