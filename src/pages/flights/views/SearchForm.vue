<template>
  <div class="search_form">
    <div class="search_form-ways">
    <div class="search_form-ways-box">
      <div class="search_form-way" :class="tripType === 0? 'active' : ''" @click="CHANGE_TYPE(0)">
        <span class="search_form-way-text" >ONE WAY</span>
      </div>
      <div class="search_form-way" :class="tripType === 0? '' : 'active'" @click="CHANGE_TYPE(1)">
        <span class="search_form-way-text">ROUND WAY</span>
      </div>
    </div>
    <!-- <div class="">
      My Trips
    </div> -->
    </div>
    <div class="search_form-cities">
      <div class="search_form-city" :class="{active: cityType === 0}" @click="SET_CITY_TYPE(0)">
        <div class="search_form-city-code">
          {{selectedCitys[0].iata}}
        </div>
        <div class="search_form-city-text">
          {{selectedCitys[0].airport}}
        </div>
      </div>
       <div class="search_form_exchange-circle" @click="EXCHANGE_CITY" >
        <i class="s-icon s-icon-exchange"></i>
      </div>
      <div class="search_form-city" :class="{active: cityType === 1}" @click="SET_CITY_TYPE(1)">
        <div class="search_form-city-code">
          {{selectedCitys[1].iata}}
        </div>
        <div class="search_form-city-text">
          {{selectedCitys[1].airport}}
        </div>
      </div>
    </div>
    <div class="search_form-calendars">
      <div class="search_form-calendar" @click="SET_DATE_TYPE(0)">
        <div class="s-icon-calendar s-icon"></div>
        <div class="search_form-calendar-text">
          {{getWDMY(departDate)}}
        </div>
      </div>
      <div class="search_form-calendar" @click="SET_DATE_TYPE(1)" v-if="tripType===1">
        <i class="s-icon-calendar s-icon"></i>
        <div class="search_form-calendar-text">
          {{getWDMY(returnDate)}}
        </div>
      </div>
    </div>
    <div class="search_form-passenger" @click="OPEN_PASSENGER">
      <i class="s-icon-user s-icon"></i>
      <div class="search_form-passenger-text">
        {{`${passengers.adult + passengers.child + passengers.infant} Traveller, ${flightClass}`}}
      </div>
    </div>
    <div class="serch_form-search" @click="searchFlight">
      Search
    </div>
    <div class="search_form-cancel" @click="$emit('closeSearchModel')">
      Cancel
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { SET_CITY_TYPE, SET_DATE_TYPE, SET_PASSENGER, CHANGE_TYPE, OPEN_PASSENGER, EXCHANGE_CITY } from '@/store/type';
import { getWDMY, getYearMonthDayString } from '@/utils/DateFormatUtils.js';

export default {
  name: 'SearchForm',
  components: {
  },
  data () {
    return {
      getWDMY
    };
  },
  computed: {
    ...mapState({
      tripType: (state) => state.SearchForm.tripType,
      selectedCitys: (state) => state.SearchForm.selectedCitys,
      cityType: (state) => state.SearchForm.cityType, // 出发地， 目的地
      // dateType: 0, //  去程 时间，回程时间
      departDate: (state) => state.SearchForm.departDate,
      returnDate: (state) => state.SearchForm.returnDate,
      passengers: (state) => state.SearchForm.passengers,
      flightClass: (state) => state.SearchForm.flightClass
    })
  },
  methods: {
    ...mapMutations([
      CHANGE_TYPE,
      SET_CITY_TYPE,
      SET_DATE_TYPE,
      SET_PASSENGER,
      OPEN_PASSENGER,
      EXCHANGE_CITY
    ]),
    searchFlight () {
      const dateString = this.tripType === 0 ? `${getYearMonthDayString(this.departDate)}` : `${getYearMonthDayString(this.departDate)}-${getYearMonthDayString(this.returnDate)}`;

      const href = `/flights/${this.selectedCitys[0].iata}-${this.selectedCitys[1].iata}/${dateString}?adults=${this.passengers.adult}&childs=${this.passengers.child}&infants=${this.passengers.infant}&cabinClass=${this.flightClass}`;

      this.$router.push(href);
      this.$emit('searchFlight');
      this.$emit('closeSearchModel');
    }
  }
};
</script>

<style lang="scss" scoped>
.search_form{
  background:rgba(1,121,89,0.1);
}
.search_form-ways{
  display: flex;
  padding-top: 0.3rem;
  margin-bottom: 10px;
}
.search_form-ways-box{
  display: flex;
  padding: 0 .3rem;
}
.search_form-way{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 0.48rem;
  font-size: 0.22rem;
  color: $green;
  border-radius: 0.08rem 0 0 0.08rem;
  border: 1px solid $green;
  & + .search_form-way{
    border-radius: 0 0.08rem 0.08rem 0;
  }
  &.active{
    background-color: $green;
    font-weight: bold;
    color: #fff;
    border: none;
  }
}
.search_form_exchange-circle{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: #fff;
}
.search_form-cities{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.3rem;
  margin-bottom: 0.2rem;
}
.search_form-city{
  width: 3.2rem;
  height: 1.83rem;
  padding: 0.2rem 0.3rem 0;
  text-align: center;
  background-color: rgba(250,250,250,1);
  border-radius: 0.12rem;
  border: 1px solid #dcdcdc;
  &.active{
    border-color: $green;
  }
}
.search_form-city-code{
  font-size: 0.56rem;
  font-weight: bold;
  // margin-bottom: ;
}
.search_form-city-text{
  color:$lighterBlack;
  font-size: 0.22rem;
  line-height: .33rem;
}

.search_form-calendars{
  display: flex;
  align-items: center;
  padding: 0 0.3rem;
  margin-bottom: 0.2rem;
}
.search_form-calendar{
  display: flex;
  align-items: center;
  width: 100%;
  background-color: rgba(250,250,250,1);
  height: 0.82rem;
  padding: 0 0.2rem;
  border-radius: 0.12rem;
  & + .search_form-calendar{
    margin-left: 0.44rem;
  }
}
.search_form-calendar-text{
  color: $lighterBlack;
  font-size: 0.24rem;
  margin-left: 0.2rem;
}
.search_form-passenger{
  display: flex;
  height: 0.82rem;
  padding: 0 0.2rem;
  margin: 0 0.3rem 0.4rem;
  align-items: center;
  background-color: rgba(250,250,250,1);
  border-radius: 0.12rem;

}
.search_form-passenger-text{
  color: $lighterBlack;
  font-size: 0.24rem;
  margin-left: 0.2rem;
}
.serch_form-search{
  @include flexCenter();
  height: 0.84rem;
  width: 6.2rem;
  font-size: 0.36rem;
  font-weight: bold;
  color: #fff;
  border-radius: 0.12rem;
  background-color: $yellow;
  margin: 0 auto;
}
.search_form-tips{
  width: 6.2rem;
  display:flex;
  padding: 0.2rem 0 0.3rem;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}
.search_form-cancel{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0;
  // width: 1.6rem;
  color: $lighterBlack;
  font-size: 0.24rem;
}

</style>
