<template>
  <div>
    <div class="coupon-info">
      <p class="coupon-info-title">Apply Coupon</p>
      <div class="coupon-info-code">
        <input type="text" name="couponCode" class="coupon-info-input" v-model="couponCode">
        <button class="btn coupon-info-btn" @click="getCoupon">Apply</button>
      </div>
      <div class="coupon-info-codeDetails" v-if="isCouponUse">
        <div class="coupon-info-codeDetails-success">
          <p class="coupon-info-codeDetails-success-num"><i class="s-icon s-icon-nike"></i> Coupon:{{couponCode}}</p>
          <p class="coupon-info-codeDetails-success-price">saved Rs {{couponPri}}</p>
        </div>
        <div class="coupon-info-code-remove" @click="removeCoupon">remove</div>
      </div>
      <div class="coupon-info-codeDetails-fail" v-if="!isCouponUse">
        <p class="coupon-info-codeDetails-fail-text">{{couponFailMsg}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import EventHub from '@/utils/EventHub';
import { bookGetCoupon } from '@/constants/ApiConstants';
export default {
  props: ['flightInfo'],
  data () {
    return {
      couponCode: '',
      isCouponUse: false,
      couponFailMsg: '',
      totalPrice: 0,
      queryData: {},
      couponPri: 0,
      couponMap: {
        tradeType: 1,
        tradeAmount: 0,
        config: { k1: '' }
      }
    }
  },
  methods: {
    getCoupon () {
      this.queryData.couponCode = this.couponCode;
      if (this.couponCode === '') {
        this.couponFailMsg = 'Please enter a valid coupon code.';
        return false;
      }
      this.$http.post(bookGetCoupon, this.queryData).then((res) => {
        if (res.success) {
          this.isCouponUse = true;
          this.couponPri = res.data.totalPrice;
          this.couponMap = {
            tradeType: 1,
            tradeAmount: this.couponPri,
            config: { k1: this.couponCode }
          }
          EventHub.$emit('sendCouponInfo', this.couponMap);
        } else {
          this.couponFailMsg = res.datamessage;
        }
      })
    },
    removeCoupon () {
      this.isCouponUse = false;
      this.couponCode = '';
      EventHub.$emit('sendCouponInfo', {});
    }
  },
  mounted () {

  },
  watch: {
    flightInfo (val) {
      const productType = val.type
      const orderNumber = val.requestFromClient.adults + val.requestFromClient.baby + val.requestFromClient.childs;
      let flightFromRequestList = [];
      let itineraryArray = [val.departFlight];
      if (val.returnFlight) {
        itineraryArray.push(val.returnFlight);
      }
      itineraryArray.forEach((value, key) => {
        flightFromRequestList.push({
          type: key + 1,
          aircompany: value.al,
          flightNumber: value.flightId,
          startDate: value.dt,
          CabinClass: '',
          bst: value.fee.bfp,
          gst: value.fee.gst
        });
        this.totalPrice = this.totalPrice + value.opr;
      });
      this.queryData = {
        totalPrice: this.totalPrice,
        orderNumber,
        tripType: itineraryArray.length,
        productType,
        deviceType: 2, // 1:pc , 2:msite, 3:android, 4: ios
        countryType: Number(val.isIntl), // 0 domestic, 1 internationnal;
        device: 'msite',
        flightFromRequestList
      };
    }
  }
}
</script>

<style lang="scss" scoped>
  .coupon-info{
    padding: 0 0.3rem;
  }
  .coupon-info-title{
    font-size: 14px;
    line-height: 30px;
    color: #666;
    font-weight: 700;
    margin-bottom: 5px;
  }
  .coupon-info-code{
    display: flex;
  }
  .coupon-info-input{
    width:4.6rem;
    height:0.54rem;
    // background:rgba(216,216,216,1);
    border-bottom:0.01rem solid rgba(220,220,220,1);
    margin-right: 0.2rem;
  }
  .coupon-info-btn{
    width:1.8rem;
    height:0.54rem;
    background:rgba(227,164,40,1);
    border-radius:0.08rem;
    font-size: 0.24rem;
    color: white;
    font-weight: 700;
  }
  .coupon-info-codeDetails-success{
    display: flex;
    margin: 0.3rem 0 0.1rem;
  }
  .coupon-info-codeDetails-success-num{
    width: 60%;
    font-size: 0.24rem;
    color:rgba(102,102,102,1);
    line-height:0.3rem;
  }
  .coupon-info-codeDetails-success-price{
    width: 40%;
    text-align: right;
    font-size: 0.28rem;
    color:rgba(17,17,17,1);
    line-height:0.35rem;
  }
  .coupon-info-codeDetails-fail{
    margin: 0.2rem 0 0.1rem;
  }
  .coupon-info-codeDetails-fail-text{
    font-size: 0.24rem;
    color: red;
  }
  .coupon-info-code-remove{
    font-size: 0.28rem;
    color:$green;
    line-height:0.35rem;
    text-align: right;
  }
</style>
