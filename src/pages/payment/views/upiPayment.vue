<template>
  <div class="upi-payment">
    <div class="upi-payment-title" :class="showpayForm ? 'active' : ''" @click="isShowUpipay">
      <p class="upi-payment-title-text">upi</p>
      <div class="upi-payment-title-img">
        <span>...</span>
      </div>
    </div>
    <vertical-toggle>
      <div v-show="showpayForm">
        <div class="upi-payment-from" >
          <form>
            <div>
              <p class="s-upiPayment-general">Enter your Virtual Payment Address (VPA)</p>
              <input class="upi-payment-number-input" type="text" name="upiNumber" v-model="email" placeholder="Ex: username@upi">
            </div>
            <div class="upi-payment-submit">
              <a class="btn upi-payment-submit-btn">Finish Payment</a>
            </div>
          </form>
        </div>
      </div>
    </vertical-toggle>
  </div>
</template>

<script>
import VerticalToggle from '@/utils/vertical-toggle.js';
export default {
  components: {
    VerticalToggle
  },
  props: ['showType'],
  data () {
    return {
      showpayForm: this.showType,
      email: ''
    }
  },
  watch: {
    showType (val) {
      this.showpayForm = val;
    }
  },
  methods: {
    isShowUpipay () {
      this.showpayForm = !this.showpayForm;
      this.$emit('eventUpiPay', 'upi');
    },
    confirmPayment () {
      let payTransactionMapEncode = {};
      payTransactionMapEncode[3] = Object.assign({},
        { paymentChannel: 6 },
        { upi_vpa: this.email }
      );
      this.$emit('confirmpaymentH', payTransactionMapEncode);
    }
  }
}
</script>

<style lang="scss" scoped>
  .upi-payment{
    width:100%;
    background:rgba(250,250,250,1);
    border-radius:0.12rem;
    border:0.01rem solid rgba(220,220,220,1);
    margin-top: 0.2rem;
  }
  .s-upiPayment-general{
    font-size: 0.24rem;
    color: #666666;
    line-height: 0.3rem;
    margin-bottom: 0.1rem;
  }
  .upi-payment-title{
    display: flex;
    justify-content: space-between;
    width:100%;
    height:0.82rem;
    line-height: 0.82rem;
    padding: 0 0.3rem;
    &.active{
      background:rgba(1,121,89,0.1);
      .upi-payment-title-text{
        font-weight:bold;
        color:$green;
      }
    }
  }
  .upi-payment-title-text{
    font-size:0.26rem;
    color:rgba(17,17,17,1);
  }
  .upi-payment-title-img{
    img{
      height:0.2rem;
      margin-right: 0.1rem;
      vertical-align: middle;
    }
    span{
      margin-left: 0.1rem;
    }
  }
  .upi-payment-from{
    padding: 0.3rem 0.2rem 0.4rem;
  }
  .upi-payment-number-input{
    width: 6.2rem;
    height: 0.6rem;
    background: white;
    border-radius: 0.08rem;
    border: 0.01rem solid gainsboro;
    padding: 0.1rem 0.2rem;
  }
  .upi-payment-submit-btn{
    display: inline-block;
    text-align: center;
    width: 6.2rem;
    height: 0.84rem;
    background: #e3a428;
    border-radius: 0.12rem;
    font-size: 0.36rem;
    font-weight: bold;
    color: white;
    line-height: 0.84rem;
    margin-top: 0.3rem;
  }
</style>
