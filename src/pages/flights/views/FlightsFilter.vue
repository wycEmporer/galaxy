<template>
  <div class="filter">
    <div class="filter_header">
      <div class="filter_header-name">Filter</div>

      <div class="filter_header-btns">
        <div class="f12 lightGray">
          show
          <span class="fb color-white f14">{{suitableFlightsList.length}}</span>
          flight
        </div>
        <button class="btn-done" @click="closeFilter">DONE</button>
      </div>
    </div>
    <div class="filter_detail">
      <div class="filter-price">
        <div class="filter-title">
          <div class="filter-title-name">Price</div>
          <div class="filter-title-clear" @click="clearPrice">clear</div>
        </div>
        <div class="filter-slider-label">
          &#8377; {{selectedPrices[0] | addCommas}} - &#8377; {{selectedPrices[1] | addCommas}}
        </div>
        <div class="filter-slider-wrap">
          <Slider :range="getPriceRange" @changeValue="changeSelectedPrices" :value="selectedPrices"/>
        </div>
      </div>

      <div class="filter-depart">
        <div class="filter-title">
          <div class="filter-title-name">Depature time - {{selectedCitys[0].city}}</div>
          <div class="filter-title-clear" @click="clearDepartTime">clear</div>
        </div>
        <div class="filter-slider-label">
          {{departTime[0] | minutesToHourAndMinute}} -  {{departTime[1] | minutesToHourAndMinute}}
        </div>
        <div class="filter-slider-wrap">
          <Slider :range="departTimeRange" @changeValue="changeDepartTime" :value="departTime"/>
        </div>
      </div>
      <div class="filter-return" v-if="tripType===1 && isInternational">
        <div class="filter-title">
          <div class="filter-title-name">Return time - {{selectedCitys[1].city}}</div>
          <div class="filter-title-clear" @click="clearReturnTime">clear</div>
        </div>
        <div class="filter-slider-label">
          {{returnTime[0] | minutesToHourAndMinute}} -  {{returnTime[1] | minutesToHourAndMinute}}
        </div>
        <div class="filter-slider-wrap">
          <Slider :range="returnTimeRange" @changeValue="changeReturnTime" :value="returnTime"/>
        </div>
      </div>

      <div class="filter-stops">
        <div class="filter-title">
          <div class="filter-title-name">Stops</div>
          <div class="filter-title-clear" @click="clearStops">clear</div>
        </div>
        <div class="filter-checklist-data">
          <label class="filter-checklist-label" v-for="stop in stops" :key="stop.value">
            <i class="iconfont f19" :class="checkedStops.includes(stop.value) ?'icon-checked-box color-pri' : 'icon-uncheck-box color-light'"></i>
            <input type="checkbox" :value="stop.value" v-model="checkedStops" style="display:none">
            <span class="filter-checklist-text">{{stop.label}}</span>
          </label>
        </div>
      </div>
      <div class="filter-airline">
        <div class="filter-title">
          <div class="filter-title-name">Airline</div>
          <div class="filter-title-clear" @click="clearAirlines">clear</div>
        </div>
        <div class="filter-checklist-data">
           <label class="filter-checklist-label" v-for="airline in airlines" :key="airline.value">
            <i class="iconfont f19" :class="checkedAirlines.includes(airline.value) ?'icon-checked-box color-pri' : 'icon-uncheck-box color-light'"></i>
            <input type="checkbox" :value="airline.value" v-model="checkedAirlines" style="display:none">
            <span class="filter-checklist-text">{{airline.label}}</span>
          </label>
        </div>
      </div>
      <!-- <div class="filter-all"><span>*</span> show all</div> -->
    </div>
  </div>
</template>
<script>
// import { Checklist } from 'mint-ui';
import { CHANGE_FILTER_OPTIONS } from '@/store/type';
import { mapMutations, mapState } from 'vuex'
import Slider from '@/components/Slider';
import * as _ from 'lodash';
import { minutesToHourAndMinute } from '@/utils/DateFormatUtils';
export default {
  components: {
    // 'mt-range': Range,
    // 'mt-checklist': Checklist,
    Slider
  },
  data () {
    return {
      // filterPrice: {
      //   value: 0,
      //   minValue: 0,
      //   maxValue: 100
      // },
      returnTimeRange: [0, 23 * 60 + 59],
      departTimeRange: [0, 23 * 60 + 59],
      stopStrings: [ 'none-stop', '1 stop', '2 stops', 'more than 3 stops' ],
      filterTime: [ 'before 6AM', '6AM - 12PM', '12PM - 6PM', 'after 6PM' ]
    };
  },
  created () {
    this.selectedPrices.length === 0 && this.CHANGE_FILTER_OPTIONS({ prices: this.getPriceRange });
  },
  computed: {
    isInternational () {
      return this.$store.getters.isInternational;
    },
    ...mapState({
      departTime: (store) => store.FlightInfo.filterOptions.departTime,
      returnTime: (store) => store.FlightInfo.filterOptions.returnTime,
      selectedPrices: (store) => store.FlightInfo.filterOptions.prices,
      tripType: (state) => state.SearchForm.tripType,
      selectedCitys: (state) => state.SearchForm.selectedCitys,
    }),
    suitableFlightsList () {
      return this.$store.getters.suitableFlightsList;
    },
    getPriceRange () {
      const list = this.$store.getters.flightsDataList;
      const minItem = _.chain(list).minBy((item) => item.fee.bfp + item.fee.gst).value();
      const maxItem = _.chain(list).maxBy(item => item.fee.bfp + item.fee.gst).value();
      return [minItem.fee.bfp + minItem.fee.gst, maxItem.fee.bfp + maxItem.fee.gst]
    },
    checkedStops: {
      get () {
        return this.$store.state.FlightInfo.filterOptions.stops;
      },
      set (stops) {
        this.CHANGE_FILTER_OPTIONS({ stops });
      }
    },
    checkedAirlines: {
      get () {
        return this.$store.state.FlightInfo.filterOptions.airlines;
      },
      set (airlines) {
        this.CHANGE_FILTER_OPTIONS({ airlines });
      }
    },
    airlines () {
      return Object.keys(this.$store.state.FlightInfo.flightsData.x.airlines).map(key => ({
        label: this.$store.state.FlightInfo.flightsData.x.airlines[key].n,
        value: key
      }))
    },
    stops () {
      return [...new Set(this.$store.getters.flightsDataList.map(val => val.sb))].sort().map(v => {
        v = v > 3 ? 3 : v;
        return {
          // label: v,
          label: this.stopStrings[v],
          value: v
        };
      })
    }
  },
  methods: {
    ...mapMutations([CHANGE_FILTER_OPTIONS]),
    changeSelectedPrices (prices) {
      this.CHANGE_FILTER_OPTIONS({ prices });
    },
    changeDepartTime (departTime) {
      this.CHANGE_FILTER_OPTIONS({ departTime });
    },
    changeReturnTime (returnTime) {
      this.CHANGE_FILTER_OPTIONS({ returnTime });
    },

    closeFilter () {
      this.$router.replace(`${location.pathname}${location.search}`)
    },

    clearPrice () {
      this.CHANGE_FILTER_OPTIONS({ prices: this.getPriceRange });
    },
    clearStops () {
      this.CHANGE_FILTER_OPTIONS({ stops: [] });
    },
    clearDepartTime () {
      this.CHANGE_FILTER_OPTIONS({ departTime: this.departTimeRange });
    },
    clearReturnTime () {
      this.CHANGE_FILTER_OPTIONS({ returnTime: this.returnTimeRange });
    },
    clearAirlines () {
      this.CHANGE_FILTER_OPTIONS({ airlines: [] });
    }
  },
  filters: {
    minutesToHourAndMinute
  }
};
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.filter{
  width:100%;
  position: relative;
  background: #fff;
}
.filter-slider-wrap{
  width:6.2rem;
  padding:0.18rem 0 0.4rem;
  margin: 0 auto;
}
.filter_header{
  position: sticky;
  top: $headerH;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 1.2rem;
  padding:0.4rem 0.3rem;
  background: #1D1D1D;
}
.filter-checklist-label{
  display:flex;
  align-items: center;
  margin-bottom: 0.2rem;
}
.filter-checklist-text{
  font-size:12px;
  color: $lightBlack;
  padding-left: 0.3rem;
}
.filter_header-name{
  font-size:0.36rem;
  line-height:0.45rem;
  letter-spacing: 1px;
  color:rgba(255,255,255,1);
}
.filter_header-btns{
  display: flex;
  align-items: center;
}

.btn-done{
  font-size:0.28rem;
  line-height:0.35rem;
  font-weight:bold;
  padding:0.07rem 0.3rem;
  border-radius:0.08rem;
  margin-left: 0.2rem;
  color:rgba(255,255,255,1);
  background: $yellow;
}
.filter_detail{
  padding-left:0.3rem;
  padding-right:0.3rem;
}
// price filter
.filter-title{
  padding-top:0.2rem;
  padding-bottom:0.2rem;
  @include flexCenter;
  justify-content: space-between;
}
.filter-title-name{
  font-size:0.28rem;
  line-height:0.35rem;
  color:$lightBlack;
  text-align: left;
  font-weight: bold;
}
.filter-title-clear{
  padding-left:0.2rem;
  font-size:0.22rem;
  line-height:0.27rem;
  text-align: right;
  cursor: pointer;
}
.filter-slider-label{
  margin-bottom: 0.18rem;
  font-size:0.32rem;
  color:rgba(17,17,17,1);
  font-weight: bold;
  line-height:0.45rem;
}
// show all
.filter-all{
  color:$green;
  font-size: 0.24rem;
  line-height: 0.3rem;
  margin-bottom:0.6rem;
  cursor: pointer;
  font-weight: bold;
  position:relative;
  padding-left: 0.2rem;
  span{
    position: absolute;
    top: 70%;
    left: 0;
    color:$green;
    transform: translateY(-50%);
  }
}
</style>
