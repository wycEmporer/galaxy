<template>
  <div class="search_passenger">
    <div class="search_passenger-wrap">
      <i class="search_city-icon_closed s-icon-closed s-icon" @click="CLOSE_PASSENGER"></i>
      <div class="search_passengers">
        <div class="search_passenger-row">
          <div class="search_passenger-row-text">
            Adults
          </div>
          <div class="search_passenger-row-count">
            <i class="s-icon-minus s-icon" @click="operateAdult(false)"></i>
            {{passengers.adult}}
            <i class="s-icon-plus s-icon" @click="operateAdult(true)"></i>
          </div>
        </div>
        <div class="search_passenger-row">
          <div class="search_passenger-row-text">
            Children (2-11y)
          </div>
          <div class="search_passenger-row-count">
            <i class="s-icon-minus s-icon" @click="operateChild(false)"></i>
            {{passengers.child}}
            <i class="s-icon-plus s-icon" @click="operateChild(true)"></i>
          </div>
        </div>
        <div class="search_passenger-row">
          <div class="search_passenger-row-text">
            Infants (below 2y)
          </div>
          <div class="search_passenger-row-count">
            <i class="s-icon-minus s-icon" @click="operateInfant(false)"></i>
            {{passengers.infant}}
            <i class="s-icon-plus s-icon" @click="operateInfant(true)"></i>
          </div>
        </div>
      </div>
      <div class="search_classes">
        <div class="search_classes-row" v-for="(val, i) in classes" :key="i">
          <div class="search_classes-row-text">
            {{val}}
          </div>
          <div>
            <i class="s-icon" :class="val === flightClass ?  's-icon-checked' : 's-icon-unchecked'" @click="SET_CLASS(val)"></i>
          </div>
        </div>
      </div>
      <div class="serch_passenger-btn" @click="CLOSE_PASSENGER" role="button" tabindex="0">
        Done
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>
<script>
// import { searchAirPortCity } from '@/constants/ApiConstants';
import { mapState, mapMutations } from 'vuex';
import { SET_PASSENGER, CLOSE_PASSENGER, SET_CLASS } from '@/store/type';

export default {
  name: 'SearchPassenger',
  components: {
  },
  data () {
    return {
      classes: ['Economy', 'Business', 'First', 'Premium Economy']
    };
  },
  computed: {
    ...mapState({
      passengers: (state) => state.SearchForm.passengers,
      flightClass: (state) => state.SearchForm.flightClass
    })
  },

  methods: {
    ...mapMutations([
      SET_PASSENGER,
      CLOSE_PASSENGER,
      SET_CLASS
    ]),
    operateAdult (flag) {
      let adult = this.passengers.adult;
      const child = this.passengers.child;
      let infant = this.passengers.infant;

      adult += flag ? 1 : -1;

      adult = Math.max(Math.min(adult, 9 - child), 1);

      this.SET_PASSENGER({ ...this.passengers, adult });
      // 再判断 婴儿人数
      infant = Math.max(Math.min(infant, adult), 0);
      return this.SET_PASSENGER({ ...this.passengers, infant });
    },
    operateChild (flag) {
      let child = this.passengers.child;
      const adult = this.passengers.adult;
      child += flag ? 1 : -1;
      child = Math.max(Math.min(child, 9 - adult), 0);
      return this.SET_PASSENGER({ ...this.passengers, child });
    },
    operateInfant (flag) {
      let infant = this.passengers.infant;
      const adult = this.passengers.adult;
      infant += flag ? 1 : -1;
      infant = Math.max(Math.min(infant, adult), 0);
      return this.SET_PASSENGER({ ...this.passengers, infant });
    }
  },
  created () {
  }
};
</script>
<style lang="scss" scoped>
.mask{
  top: $headerH;
}
.search_passenger{
  position: fixed;
  top: $headerH;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 20;
  background-color: rgba($color: #000000, $alpha: .7);
}
.search_passenger-wrap{
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 0.3rem;
  border-radius: .16rem;
  background-color: #fff;
  margin-top: 1.37rem;
  z-index: 30;
}
.search_city-icon_closed{
  position: absolute;
  left: 50%;
  top: -0.7rem;
  transform: translateX(-50%);
}
.search_passengers{
  padding: 0 0.45rem;
  border-bottom: 1px solid $lightGray;
}
.search_classes{
  padding: 0.4rem 0.45rem;
}
.search_passenger-row, .search_classes-row{
  display:flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}
.search_passenger-row-text,.search_classes-row-text{
  font-size: 0.28rem;
  font-weight: bold;
}
.search_passenger-row-count{
  width: 2.2rem;
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-content: space-between;
}
.serch_passenger-btn{
  @include flexCenter();
  font-weight: bold;
  font-size: 0.36rem;
  width: 6.2rem;
  height: 0.84rem;
  color: #fff;

  margin: 0 auto;
  background-color: $yellow;
  border-radius: 0.12rem;
}
</style>
