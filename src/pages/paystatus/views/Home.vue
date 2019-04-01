<template>
  <div class="payment-status-wrap">
    <div class="payment-status-success" v-if="numPayStatus === 1">
      <p class="payment-status-success-title">Thanks For Booking </p>
      <p class="payment-status-tips">We have received your order. Flight details will be mailed to your email address within minutes.</p>
    </div>
    <div class="payment-status-fail" v-if="numPayStatus === 2">
      <p class="payment-status-fail-title">Thanks For Booking </p>
      <p class="payment-status-tips">Dear customer, your payment for order: {{orderDetail.orderid}} has failed. </p>
    </div>
    <div class="payment-status-fail" v-if="numPayStatus === 0">
      <p class="payment-status-fail-title">Thanks For Booking </p>
      <p class="payment-status-tips">Please check the bank account information and your network connection.</p>
      <p class="payment-status-tips">You can still purchase your flight within 30 minutes without any price change. Click <a href="" class="a_link">here</a> or go to <a href="/trip" class="a_link">My Trip</a> to finish your payment.</p>
    </div>
    <div class="payment-status-info">
      <p class="payment-status-info-title">Order Detail</p>
      <div class="payment-status-detail-info">
        <p class="payment-status-detail-info-item">
          <span>Order ID: </span>
          <a class="color-pri" :href="`/trip/detail?tripId=${orderDetail.orderid}`">{{orderDetail.orderid}}</a>
        </p>
        <p class="payment-status-detail-info-item">
          <span>Contact name: </span>
          <span>{{orderDetail.contactName}}</span>
        </p>
        <p class="payment-status-detail-info-item">
          <span>Mobile number: </span>
          <span>{{orderDetail.contactMob}}</span>
        </p>
        <p class="payment-status-detail-info-item">
          <span>E-mail address: </span>
          <span>{{orderDetail.contactEmail}}</span>
        </p>
      </div>
      <p class="payment-status-detail-more" @click="isShowDetail = !isShowDetail">view flight detail
        <i class="s-icon" :class="isShowDetail? 's-icon-up' : 's-icon-down'"></i>
      </p>
      <vertical-toggle>
        <div v-show="isShowDetail">
          <div class="payment-status-detail-more-info">
            <p class="payment-status-detail-info-item">
              <span>Date:</span>
              <span>{{orderDetail.cityAndTime}}</span>
            </p>
            <p class="payment-status-detail-info-item">
              <span>From: </span>
              <span>{{orderDetail.from}}</span>
            </p>
            <p class="payment-status-detail-info-item">
              <span>To: </span>
              <span>{{orderDetail.to}}</span>
            </p>
            <p class="payment-status-detail-info-item">
              <span>Traveler: </span>
              <span>{{orderDetail.strTraveller}}</span>
            </p>
            <!-- <p class="payment-status-detail-info-item">
              <span>Cabin Class: </span>
              <span>Economy</span>
            </p> -->
          </div>
        </div>
      </vertical-toggle>
    </div>
    <div class="payment-status-info-support">
      <p class="payment-status-detail-info-item">24/7 Support</p>
      <p class="payment-status-detail-info-item">
        <span>Tel: </span>
        <span>0124-607-9960/ 1860-313-9999</span>
      </p>
      <p class="payment-status-detail-info-item">
        <span>Email:</span>
        <span>cs@happpeasygo.com</span>
      </p>
    </div>
    <div class="payment-status-detail-info-srcad">
      <img src="" alt="" class="">
    </div>
    <div class="text-align">
      <a href="/" class="payment-status-go-home">Back to Home</a>
    </div>
  </div>
</template>
<script>
import VerticalToggle from '@/utils/vertical-toggle.js';
import { queryOrderDetail } from '@/constants/ApiConstants';
export default {
  name: 'Home',
  components: {
    VerticalToggle
  },
  data () {
    return {
      isShowDetail: false,
      orderDetail: {},
      numPayStatus: 0,
    };
  },

  methods: {
    getDetail (data) {
      const { contactEmail, contactMob, contactName } = data.triplist[0];

      const departFlight = data.triplist[0].voyageinfo[0];
      // 单程，往返人数一样 所以取第一单程
      const travellerinfo = data.triplist[0].travellerinfo;
      const numAdult = travellerinfo.filter(v => v.passengerType === 1).length;
      const numChild = travellerinfo.filter(v => v.passengerType === 2).length;
      const numInfant = travellerinfo.filter(v => v.passengerType === 3).length;

      let strTraveller = `${numAdult} ${numAdult > 1 ? 'Adults ' : 'Adult '}`
      strTraveller += numChild > 0 ? numChild + (numChild > 1 ? 'Childs ' : 'Child ') : '';
      strTraveller += numInfant > 0 ? numInfant + (numInfant > 1 ? 'Infants ' : 'Infant ') : '';

      // 获取时间和城市
      let cityAndTime = `${departFlight.dt.slice(0, -6)}(${departFlight.ds})`;
      if (data.triplist.length === 2) {
        const reutnFlight = data.triplist[1].voyageinfo[0];
        cityAndTime += ` - ${reutnFlight.dt.slice(0, -6)}(${reutnFlight.ds}), Round trip`
      }
      // 获取城市
      const from = `${departFlight.dc}(${departFlight.ds})`;
      const arriveFlight = data.triplist[0].voyageinfo[data.triplist[0].voyageinfo.length - 1]
      const to = `${arriveFlight.ac}(${departFlight.as})`;

      this.orderDetail = { ...data.order, ...{ contactEmail, contactMob, contactName, cityAndTime, from, to, strTraveller } };
    },
    // getPaymentStatus (numStatus) {
    //   switch (numStatus) {
    //     case 0:
    //   }
    // },
    getOrder () {
      this.$http(`${queryOrderDetail}?orderId=${this.$route.query.orderid}`).then(res => {
        if (res.code === 0) {
          this.getDetail(res.data);
          this.numPayStatus = res.data.triplist[0].payStatus;
        }
      })
    },
  },
  created () {
    this.getOrder();
  }
};
</script>
<style lang="scss" scoped>
  .text-align{
    text-align: center;
  }
  .a_link{
    color: $green;
    text-decoration: underline;
  }
  .payment-status-success,
  .payment-status-fail{
    padding: 0.1rem  0.3rem;
  }

  .payment-status-success-title{
    font-size:0.34rem;
    font-weight:bold;
    color:rgba(1,121,89,1);
    line-height:0.48rem;
  }
  .payment-status-tips{
    font-size:0.24rem;
    color:rgba(102,102,102,1);
    line-height:0.36rem;
    margin: 0.2rem 0;
  }
  .payment-status-fail-title{
    font-size:0.34rem;
    font-weight:bold;
    color:rgba(189,0,0,1);
    line-height:0.43rem;
  }
  .payment-status-info{
    border-bottom: 1px solid #DCDCDC;
    padding: 0  0.3rem 0.4rem;
  }
  .payment-status-info-title{
    font-size:0.28rem;
    font-weight:bold;
    color:rgba(102,102,102,1);
    line-height:0.35rem;
    margin-bottom: 0.2rem;
  }
  .payment-status-detail-info-item{
    font-size:0.24rem;
    color:rgba(102,102,102,1);
    line-height:0.3rem;
    margin: 0.1rem;
  }
  .payment-status-detail-more{
    font-size:0.24rem;
    color:$green;
    line-height:0.3rem;
    margin: 0.3rem 0 0;
    .s-icon{
      margin-left: 0.1rem;
    }
  }
  .payment-status-detail-more-info{
    padding-top: 0.2rem;
  }
  .payment-status-info-support{
    padding: 0.3rem 0.3rem 0.4rem;
  }
  .payment-status-detail-info-srcad{
    width: 100%;
    height:1.8rem;
    background: red;
    text-align: center;
  }
  .payment-status-go-home{
    display: inline-block;
    width:6.2rem;
    height:0.84rem;
    background:rgba(227,164,40,1);
    border-radius:0.12rem;
    margin: 0.4rem 0 0.6rem;
    font-size:0.36rem;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:0.84rem;
  }
</style>
