<template>
  <div class="home-wrap">
    <SearchCity v-if="showCityLayer"/>
    <Calendar v-if="showCalendarLayer" />
    <SearchPassenger v-if="showPassengerLayer" />
    <HomeTopBanner/>
    <SearchForm />
    <SearchHistory/>
    <SaveUp/>
    <!-- <HomeOffer/> -->
    <!-- <RecentTrips /> -->
    <HomeInfo/>
    <div class="home-logo">
      <img class="home-logo-img" src="//m.happyeasygo.com/dist/images/909c104a220392369ac4a6a7818a5909.png" alt="">
      BEST PRICE GUARANTEED
    </div>
  </div>
</template>
<script>
import SearchForm from './SearchForm';
import { mapState } from 'vuex';
import HomeTopBanner from './HomeTopBanner';
import SearchHistory from './SearchHistory';
// import RecentTrips from './RecentTrips';
// import HomeOffer from './Offer';
import SaveUp from './SaveUp';
import HomeInfo from './HomeInfo';

export default {
  name: 'Home',
  components: {
    SearchForm,
    HomeTopBanner,
    SearchHistory,
    // RecentTrips,
    SaveUp,
    HomeInfo,
    // HomeOffer,
    SearchCity: () => import('@/components/SearchCity'),
    Calendar: () => import('@/components/Calendar'),
    SearchPassenger: () => import('@/components/SearchPassenger')
  },
  data () {
    return {
      showCity: false
    };
  },
  computed: {
    ...mapState({
      showCityLayer: (state) => state.SearchForm.showCityLayer,
      showCalendarLayer: (state) => state.SearchForm.showCalendarLayer,
      showPassengerLayer: (state) => state.SearchForm.showPassengerLayer
    })
  },
  methods: {

  },
  created () {

  }
};
</script>
<style lang="scss" scoped>
  .home-wrap{
    width: 100%;
    overflow: hidden;
    background-color: #f1f1f1;
  }

  .home-logo{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 0.98rem;
    font-size: 0.22rem;
    color: $lightBlack;
    background-color: #fff;
  }
  .home-logo-img{
    width: 3.41rem;
  }
</style>
