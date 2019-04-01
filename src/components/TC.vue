<template>
  <div class="TC">
    <HeaderTop header-title="Terms & Conditions" :goBack="false">
      <span slot="title_center" class="s-icon s-icon-return hide_tc" @click="hideTC"></span>
    </HeaderTop>
    <div class="tc-info">
      <p class="tc-info-title">General Terms of Use & Services</p>
      <p class="tc-info-detail_1">The website www.happyeasygo.com (the "Site") is published and maintained by HAPPYEASYGO TRAVELS PRIVATE LIMITED ("HEG"), a HEG incorporated and existing in accordance with the laws of India When you access, browse or use this Site, you accept, without limitation or qualification, the terms and conditions set forth herein. When you access any of the sub-Site (whether belonging to an 'associate' of HEG or otherwise) through this Site, then such sub-Site may have its own terms and conditions, which are specific to such sub-Site.
      </p>
      <a href="/" class="a_link tc-info-domestic">Domestic Flight Booking Terms</a>
      <p class="tc-info-title">General Terms of Use & Services</p>
      <ul class="tc-info-detail_2">
        <li>In case of flown tickets, no refund will be applicable.</li>
        <li>Fare will be refunded to the account used for booking.</li>
        <li>The refund amount calculated is based on the fare rules & restrictions and flight booking policy, hence the final amount may vary from the original price.</li>
        <li>
          <p>Refund will be processed in sequence below as per the mode of payment you opted while booking:</p>
          <p>1. Happy Silver</p>
          <p>2. Happy Gold</p>
          <p>3. Account/Cards</p>
        </li>
        <li>Coupon applied will be deducted from the refundable amount.</li>
      </ul>
      <p class="tc-info-title">General Terms of Use & Services</p>
      <ul class="tc-info-detail_3">
        <li>In case of flown tickets, no refund will be applicable.</li>
        <li>In case of flown tickets, no refund will be applicable.</li>
        <li>In case of flown tickets, no refund will be applicable.</li>
        <li>In case of flown tickets, no refund will be applicable.</li>
        <li>In case of flown tickets, no refund will be applicable.</li>
        <li>In case of flown tickets, no refund will be applicable.</li>
        <li>In case of flown tickets, no refund will be applicable.</li>
      </ul>
      <p class="tc-info-title">General Terms of Use & Services</p>
      <ul class="tc-info-detail_2">
        <li>In case of flown tickets, no refund will be applicable.</li>
        <li>Fare will be refunded to the account used for booking.</li>
        <li>The refund amount calculated is based on the fare rules & restrictions and flight booking policy, hence the final amount may vary from the original price.</li>
        <li>
          <p>Refund will be processed in sequence below as per the mode of payment you opted while booking:</p>
          <p>1. Happy Silver</p>
          <p>2. Happy Gold</p>
          <p>3. Account/Cards</p>
        </li>
        <li>Coupon applied will be deducted from the refundable amount.</li>
      </ul>
      <p class="tc-info-title">General Terms of Use & Services</p>
      <ul class="tc-info-detail_3">
        <li>In case of flown tickets, no refund will be applicable.</li>
        <li>In case of flown tickets, no refund will be applicable.</li>
        <li>In case of flown tickets, no refund will be applicable.</li>
        <li>In case of flown tickets, no refund will be applicable.</li>
        <li>In case of flown tickets, no refund will be applicable.</li>
        <li>In case of flown tickets, no refund will be applicable.</li>
        <li>In case of flown tickets, no refund will be applicable.</li>
      </ul>
      <p class="tc-info-title">General Terms of Use & Services</p>
      <p class="tc-info-detail_1">
        The website www.happyeasygo.com (the "Site") is published and maintained by HAPPYEASYGO TRAVELS PRIVATE LIMITED ("HEG"), a HEG incorporated and existing in accordance with the laws of India When you access, browse or use this Site, you accept, without limitation or qualification, the terms and conditions set forth herein. When you access any of the sub-Site (whether belonging to an 'associate' of HEG or otherwise) through this Site, then such sub-Site may have its own terms and conditions, which are specific to such sub-Site.
      </p>
    </div>
  </div>
</template>
<script>
import HeaderTop from '@/components/Header.vue';
import EventHub from '@/utils/EventHub';
export default {
  name: 'Home',
  components: {
    HeaderTop
  },
  methods: {
    hideTC () {
      EventHub.$emit('isShowTC', false);
    }
  }
};
</script>
<style lang="scss" scoped>
  .a_link{
    color: $green;
    text-decoration: underline;
  }
  .TC{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1050;
    overflow: auto;
    background: white;
  }
  .hide_tc{
    position: absolute;
  }
  .tc-info{
    padding: 0.1rem 0.3rem 0.5rem;
  }
  .tc-info-title{
    font-size:0.28rem;
    font-weight:bold;
    color:rgba(102,102,102,1);
    line-height:0.35rem;
    margin-bottom: 0.13rem;
  }
  .tc-info-detail_1{
    font-size:0.24rem;
    color:rgba(153,153,153,1);
    line-height:0.37rem;
  }
  .tc-info-domestic{
    display: inline-block;
    font-size:0.24rem;
    line-height:0.3rem;
    margin:0.2rem 0 0.3rem 0;
  }
  .tc-info-detail_2{
    line-height: 0.37rem;
    padding-left: 0.3rem;
    font-size: 0.24rem;
    margin-bottom: 0.2rem;
    li{
      list-style: disc;
      color:rgba(153,153,153,1);
      p{
        color:rgba(153,153,153,1);
      }
    }
  }
  .tc-info-detail_3{
    font-size:0.24rem;
    line-height:0.3rem;
    padding-left: 0.24rem;
    li{
      color:rgba(102,102,102,1);
      list-style: decimal;
      margin-bottom: 0.16rem;
    }
  }
</style>
