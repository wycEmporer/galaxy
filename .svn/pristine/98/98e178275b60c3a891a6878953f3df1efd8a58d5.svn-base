<template>
  <div class="list" >
    <template v-if="tripType === 1 && isInternational">
      <div v-for="(item, index) in sortFlightsList" :key="index">
        <International :flightInfo ="item" :advImagelist="advImagelist" @click.native="selectFlight(item)" />
        <div class="adv_images" v-if="advImagelist[parseInt(index / 4)] && (index+1)% 4 === 1">
          <img  :src="advImagelist[parseInt(index / 4)]" alt="">
        </div>
      </div>
    </template>
    <template v-else>
      <div v-for="(item, index) in sortFlightsList" :key="index">
        <Oneway :flightInfo="item" @click.native="selectFlight(item)" />
        <div class="adv_images" v-show="advImagelist[parseInt(index / 4)] && ((index+1)% 4 === 1)" >
          <img :src="advImagelist[parseInt(index / 4)]" alt="">
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { getRoundTripPrice } from '@/constants/ApiConstants';
import { SET_SELECTED_FLIGHTS } from '@/store/type';
import { airlineDiscount } from '@/utils/airlineDiscount';
import { MessageBox } from 'mint-ui';

export default {
  props: {
    advImagelist: Array,
  },
  components: {
    Oneway: () => import('@/components/FlightInfo.vue'),
    International: () => import('@/components/FlightInfoInter.vue')
  },
  data () {
    return {
      showDepartList: true,
      showReturnList: false
    };
  },
  computed: {
    ...mapState({
      tripType: state => state.SearchForm.tripType,
      showWhichFlights: state => state.FlightInfo.showWhichFlights,
      selectedFlights: state => state.FlightInfo.selectedFlights,
      flightsDataConfig: state => state.FlightInfo.flightsData.x
    }),
    ...mapGetters([
      'isInternational',
      'sortFlightsList'
    ])
  },
  methods: {
    ...mapMutations([SET_SELECTED_FLIGHTS]),
    selectFlight (item) {
      if (!this.isInternational && this.tripType === 1 && this.showWhichFlights === 0) {
        this.SET_SELECTED_FLIGHTS({ data: item, index: 0 })
        this.$router.push(`${location.pathname}${location.search}&departid=${item.id}`)
        return;
      }
      if (this.tripType === 0 || this.isInternational) {
        this.SET_SELECTED_FLIGHTS({ data: item, index: 0 })
        this.$router.push(`/flights/${item.id}`)
        return;
      }
      // 第二次选择回程
      if (this.showWhichFlights === 1) {
        // 设置 选择的航班
        this.SET_SELECTED_FLIGHTS({ data: item, index: 1 });
        this.getRountTirpPrice().then(res => {
          if (res.code !== 0) {
            return MessageBox({
              title: 'Notice',
              message: res.message,
              showCancelButton: true
            });
          }
          const newDepart = { ...this.selectedFlights[0],
            ...{
              fee: { ...this.selectedFlights[0].fee, ...res.data.departFlight.fee },
              feee: res.data.departFlight.feee
            }
          }
          const newReturn = { ...this.selectedFlights[1],
            ...{
              fee: { ...this.selectedFlights[1].fee, ...res.data.returnFlight.fee },
              feee: res.data.returnFlight.feee
            }
          }
          // 设置新的往返价格
          this.SET_SELECTED_FLIGHTS({ data: newDepart, index: 0 });
          this.SET_SELECTED_FLIGHTS({ data: newReturn, index: 1 });
          // 跳转
          const departId = this.$route.query.departid;
          this.$router.replace(`/flights/${departId}-${item.id}`)
        })
      }
      // sessionStorage.setItem('flightInfo', JSON.stringify(item));
      // window.location.href = 'http://channelh5.happyeasygo.com:3000/confirm';
    },
    getRountTirpPrice () {
      const departF = this.selectedFlights[0];
      const returnF = this.selectedFlights[1];
      const sendData = {
        departFlight: {
          fee: departF.fee,
          fn: departF.fn,
          feee: departF.feee,
        },
        returnFlight: {
          fee: returnF.fee,
          fn: returnF.fn,
          feee: returnF.feee,
        },
        rtd: airlineDiscount({ fn: departF.fn, al: departF.al }, { fn: returnF.fn, al: returnF.al }, this.flightsDataConfig.rtd).ord,
      };
      return this.$http.post(getRoundTripPrice, sendData);
    }
  }
};
</script>
<style lang="scss" scoped>
.list{
  padding:0.3rem;
  background: #f1f1f1;
}
//adv_images
.adv_images img{
  width:6.6rem;
  vertical-align: top;
  margin-bottom: 0.2rem;
  border-radius:0.04rem;
}
</style>
