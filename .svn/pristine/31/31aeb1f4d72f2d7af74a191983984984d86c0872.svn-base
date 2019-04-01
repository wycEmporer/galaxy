<template>
  <div class="insure-details">
    <HeaderTop header-title="Insurance Details" :goBack="false">
      <span slot="title_center" class="s-icon s-icon-return hide_tc" @click="hideInsureDetail"></span>
    </HeaderTop>
    <div class="insure-details-info">
      <p class="insure-details-info-title">Particulars and features</p>
      <div class="insure-details-info-particulars">
        <p class="insure-details-info-particulars-key">Age:</p>
        <p class="insure-details-info-particulars-val">The policy covers persons in the age gruop of 6 months to 70 years old.</p>
      </div>
      <div class="insure-details-info-particulars">
        <p class="insure-details-info-particulars-key">Coverage Type:</p>
        <p class="insure-details-info-particulars-val">Individule</p>
      </div>
      <p class="insure-details-info-title">Coverage</p>
      <p class="insure-details-info-title">Personal Accident (Accidental Death)</p>
      <div class="insure-details-info-particulars">
        <p class="insure-details-info-particulars-key">Sum Insured:</p>
        <p class="insure-details-info-particulars-val">Rs. 500,000</p>
      </div>
      <div class="insure-details-info-particulars">
        <p class="insure-details-info-particulars-key">Deductable:</p>
        <p class="insure-details-info-particulars-val">Nil</p>
      </div>
      <p class="insure-details-info-title">Personal Accident (Accidental Death)</p>
      <div class="insure-details-info-particulars">
        <p class="insure-details-info-particulars-key">Sum Insured:</p>
        <p class="insure-details-info-particulars-val">Rs. 500,000</p>
      </div>
      <div class="insure-details-info-particulars">
        <p class="insure-details-info-particulars-key">Deductable:</p>
        <p class="insure-details-info-particulars-val">Nil</p>
      </div>
      <p class="insure-details-info-title">Personal Accident (Accidental Death)</p>
      <div class="insure-details-info-particulars">
        <p class="insure-details-info-particulars-key">Sum Insured:</p>
        <p class="insure-details-info-particulars-val">Rs. 500,000</p>
      </div>
      <div class="insure-details-info-particulars">
        <p class="insure-details-info-particulars-key">Deductable:</p>
        <p class="insure-details-info-particulars-val">Nil</p>
      </div>
      <div class="insure-details-info-submit">
        <a href="" class="insure-details-info-submit-btn">Submit</a>
      </div>
    </div>
    <div class="insure-details-foot-logo">
      <img src="" alt="" class="">
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
    hideInsureDetail () {
      EventHub.$emit('isShowInsureDetail', false);
    }
  }
}
</script>

<style lang="scss" scoped>
  .insure-details {
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
  .insure-details-info{
    padding: 0rem 0.3rem;
  }
  .insure-details-info-title{
    font-size:0.28rem;
    font-weight:bold;
    color:rgba(102,102,102,1);
    line-height:0.35rem;
    margin:0.2rem 0 0.3rem;
  }
  .insure-details-info-particulars{
    display: flex;
    margin-bottom: 0.2rem;
  }
  .insure-details-info-particulars-key{
    width: 40%;
    font-size:0.24rem;
    color:rgba(153,153,153,1);
    line-height:0.3rem;
  }
  .insure-details-info-particulars-val{
    width: 60%;
    font-size:0.24rem;
    color:rgba(17,17,17,1);
    line-height:0.28rem;
  }
  .insure-details-info-submit{
    text-align: center;
  }
  .insure-details-info-submit-btn{
    display: inline-block;
    width:6.2rem;
    height:0.84rem;
    background:rgba(227,164,40,1);
    border-radius:0.12rem;
    font-size:0.36rem;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:0.84rem;
    text-align: center;
    margin: 0.4rem 0 0.6rem;
  }
  .insure-details-foot-logo{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    border-top: 0.04rem solid #cdcdcd;
  }
</style>
