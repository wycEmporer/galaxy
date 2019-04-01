<template>
  <div>
    <FlightSelectedDepart v-if="showWhichFlights === 1"/>
    <div class="flights_sort">
      <div class="flights_filter">
        <h3 class="flights_filter-select">{{showWhichFlightsString}}</h3>
        <p class="flights_filter-text" @click="showFilterModel">Filter <i class="flights_filter-icon s-icon s-icon-filter"></i></p>
      </div>
      <ul class="flights_sort_type">
        <li class="sort_type-li" v-for="item in sortTypes" :key="item.id" @click="changeSortType(item.id)">
          <span class="sort_type-child" :class="{'sort_type-child-active': item.id === sortType}">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import FlightSelectedDepart from '../views/FlightSelectedDepart';
export default {
  components: {
    FlightSelectedDepart
  },
  data () {
    return {
      sortTypes: [
        { id: 0, name: 'Best Price' },
        { id: 1, name: 'Shortest Time' },
        { id: 2, name: 'Departure Time' }
      ]
    };
  },
  computed: {
    ...mapState({
      showWhichFlights: (state) => state.FlightInfo.showWhichFlights,

      sortType: (state) => state.FlightInfo.sortType,
    }),
    showWhichFlightsString () {
      return this.showWhichFlights === 0 ? 'Select flight' : 'Select Returnning flight';
    }
  },
  methods: {
    showFilterModel () {
      this.$router.push(`${location.pathname}${location.search}#filter`);
      // this.$emit('showFilterModel');
    },
    changeSortType (id) {
      this.$store.commit('CHANGE_FLIGHT_SORT', id);
    }
  }
};
</script>
<style lang="scss" scoped>
.flights_sort{
  padding:0.3rem 0.3rem 0;
}
.flights_filter{
  @include flexCenter;
  justify-content: space-between;
}
.flights_filter-select{
  font-size: 0.28rem;
  color: $lightBlack;
  font-weight:bold;
  line-height: 0.36rem;
  cursor: pointer;
}
.flights_filter-text{
  color: $green;
  font-size: 0.24rem;
  cursor: pointer;
}
.flights_filter-icon{
  margin-left:0.05rem;
  vertical-align: middle;
}
// sort
.flights_sort_type{
  @extend .flights_filter ;
  margin-top: 0.4rem;
}
.sort_type-li{
  flex:1;
  text-align: center;
}
// .sort_type-li:nth-of-type(2){
//   flex:1;
//   text-align: center;
// }
// .sort_type-li:last-child{
//   flex:1;
//   text-align: right;
// }
.sort_type-child{
  display: inline-block;
  font-size: 0.24rem;
  color:$lightBlack;
  line-height: 0.3rem;
  padding-bottom: 0.18rem;
  border-bottom:2px solid transparent;
}
.sort_type-child-active{
  color:$green;
  border-bottom:2px solid $green;
}
</style>
