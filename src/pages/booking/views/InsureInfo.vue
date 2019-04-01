<template>
  <div class="insure-info">
    <div>
      <p class="insure-info-title">Secure Your Trip</p>
      <p class="insure-info-tips">96% of our customers insure their trip. See all the benefits you get for just Rs.{{insurePri}}</p>
      <div class="insure-info-details" :class="checked ? 'active' : ''">
        <div class="insure-info-details-benifits">
          <div class="insure-info-details-benifits-item">
            <div class="insure-info-details-benifits-item-icon"><i class="s-icon s-icon-cancel"></i></div>
            <div class="insure-info-details-benifits-item-text">
              <p>Claim upto &#8377; 20,00</p>
              <p>Trip Cancellation</p>
            </div>
          </div>
          <div class="insure-info-details-benifits-item">
            <div class="insure-info-details-benifits-item-icon"><i class="s-icon s-icon-delay"></i></div>
            <div class="insure-info-details-benifits-item-text">
              <p>Claim upto &#8377; 20,00</p>
              <p>Trip Cancellation</p>
            </div>
          </div>
          <p class="insure-info-details-benifits-knowmore">and 8 more benifits <span class="a_link" @click="isShowDetail">know more</span></p>
        </div>
        <div class="insure-info-select">
          <input type="checkbox" v-model="checked" id="insure-checkbox" class="contacts-info-gst-input hide">
          <label for="insure-checkbox"  @click="isCheckInsure" class="insure-info-details-select"> <i class="s-icon contacts-info-gst-check" :class="checked ? 's-icon-select' : 's-icon-unselect'"></i> Secure trip</label>
        </div>
      </div>
      <p class="insure-info-note">Note: Insurance only apply to Indian citizen aged between 6 months to 70 ? years old. <span @click="showTC" class="a_link">terms & conditions</span></p>
    </div>
    <transition name="insure-slide">
      <insureDetail v-if="isInsureDetail"></insureDetail>
    </transition>
  </div>
</template>

<script>
import EventHub from '@/utils/EventHub';
import insureDetail from './InsureDetails';
import { hasInsurance } from '@/constants/ApiConstants';
export default {
  props: ['flightInfo'],
  data () {
    return {
      checked: true,
      isInsureDetail: false,
      insurePri: 0,
      days: 0
    };
  },
  methods: {
    isCheckInsure () {
      EventHub.$emit('isCheckInsure', { insurePri: !this.checked ? this.insurePri : 0, days: this.days });
    },
    showTC () {
      EventHub.$emit('isShowTC', true);
    },
    isShowDetail () {
      this.isInsureDetail = true;
    },
    getInsure (parame) {
      this.$http.post(hasInsurance, parame).then((res) => {
        if (res.success) {
          this.insurePri = res.data.productInfoList[0].price * res.data.days;
          this.days = res.data.days;
          this.checked = res.hasInsurance;
        }
        EventHub.$emit('isCheckInsure', { insurePri: this.checked ? this.insurePri : 0, days: this.days });
      })
    }
  },
  created () {
    EventHub.$on('isShowInsureDetail', (res) => {
      this.isInsureDetail = res;
    })
  },
  watch: {
    flightInfo (val) {
      let reqData = {
        token: val.token,
        passengerCount: val.travellers,
        from: val.departFlight.ds,
        to: val.departFlight.as,
        international: val.isIntl,
        departFlightList: [
          {
            departDateTime: val.departFlight.dt,
            wdt: val.departFlight.wdt,
            arrDateTime: val.departFlight.at
          }
        ]
      };
      if (val.returnFlight && Object.keys(val.returnFlight).length !== 0) {
        reqData.returnFlightList = [
          {
            departDateTime: val.returnFlight.dt,
            arrDateTime: val.returnFlight.at,
            wdt: val.returnFlight.wdt
          }
        ];
      }
      this.getInsure(reqData);
    }
  },
  components: {
    insureDetail
  }
};
</script>

<style lang="scss" scoped>
  .insure-info-title{
    font-size: 14px;
    line-height: 30px;
    color: $lightBlack;
    font-weight: 700;
  }
  .insure-info-tips{
    font-size:0.24rem;
    font-weight:bold;
    color:$green;
    line-height:0.32rem;
    margin: 0.2rem 0 0.3rem;
  }
  .insure-info-details{
    width: 100%;
    height:2.7rem;
    background:rgba(234,234,234,1);
    box-shadow:0rem 0.02rem 0.06rem 0rem rgba(174,174,174,1);
    border-radius:0.08rem;
    display: flex;
    padding: 0.2rem;
    align-items:center;
    margin-bottom: 0.2rem;
    position: relative;
    &::before{
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      width: 1.72rem;
      height: 2.22rem;
      background: url('../images/insurebg.png') no-repeat;
      background-size: 100%;
    }
    &.active{
      background:rgba(1,121,89,0.1);
      &::before{
        background: url('../images/insurebg_a.png') no-repeat;
        background-size: 100%;
      }
    }
  }
  .insure-info-details-benifits{
    width: 4rem;
  }
  .insure-info-details-benifits-item{
    display: flex;
    margin-bottom: 0.3rem;
  }
  .insure-info-details-benifits-item-icon{
    margin: 0.17rem 0.2rem 0 0;
  }
  .insure-info-details-benifits-item-text{
    width:2.39rem;
    height:0.68rem;
    font-size:0.22rem;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:0.34rem;
  }
  .insure-info-details-benifits-knowmore{
    font-size:0.2rem;
    font-weight:400;
    color:rgba(17,17,17,1);
    line-height:0.34rem;
  }
  .insure-info-note{
    font-size:0.2rem;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height: 0.3rem;
  }
  .insure-slide-enter-active {
    animation: bounce-in .5s ease-out;
  }
  .insure-slide-leave-active {
    animation: bounce-in .5s ease-out reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: translateX(500px);
    }
    100% {
      transform: translateX(0px);
    }
  }
</style>
