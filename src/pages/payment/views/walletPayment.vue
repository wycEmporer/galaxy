<template>
  <div class="wallet-payment">
    <div class="wallet-payment-title" :class="showpayForm ? 'active' : ''" @click="isShowWalletpay">
      <p class="wallet-payment-title-text">Mobile Wallet</p>
      <div class="wallet-payment-title-img">
        <img v-for="item in wallet.walletList" :key="item.id" :src="item.bankpic" alt="">
        <span>...</span>
      </div>
    </div>
    <vertical-toggle>
      <div v-if="showpayForm">
         <div class="wallet-payment-from" >
          <div class="wallet-payment-from-cardType" v-if="wallet.walletList.length > 0">
            <div class="wallet-payment-from-cardType-select" v-for="item in wallet.walletList" :key="item.id">
              <label :for="'walletType'+item.id" class="wallet-payment-info-label" >
                <i class="s-icon" :class="selectId == item.id ? 's-icon-checked' : 's-icon-unchecked'"></i>
                &nbsp;<img :src="item.bankpic" alt="" style="width:1.4rem;height:0.28rem;vertical-align:middle;" />
              </label>
              <input name="walletType" class="hide" :id="'walletType'+item.id" type="radio" v-model="selectId" :value="item.id"/>
            </div>
          </div>
          <!-- <div>
            <p class="wallet-payment-from-text">Choose your bank</p>
            <div>
              <select class="wallet-payment-from-select" v-model="selectId">
                <option v-for="item in wallet.walletList" :key="item.id" :value="item.id">{{item.walletName}}</option>
              </select>
            </div>
          </div> -->
          <div class="wallet-payment-submit">
            <a class="btn wallet-payment-submit-btn" @click="confirmPayment">Finish Payment</a>
          </div>
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
  props: ['showType', 'wallet'],
  data () {
    return {
      selectId: null,
      showpayForm: this.showType
    }
  },
  watch: {
    showType (val) {
      this.showpayForm = val;
    }
  },
  methods: {
    isShowWalletpay () {
      this.showpayForm = !this.showpayForm;
      this.$emit('eventWalletPay', 'wallet');
    },
    confirmPayment () {
      let payTransactionMapEncode = {};
      payTransactionMapEncode[3] = Object.assign({},
        { paymentChannel: 4 },
        { paymentWallet: this.selectId }
      );
      this.$emit('confirmpaymentH', payTransactionMapEncode);
    }
  }
}
</script>

<style lang="scss" scoped>
  .wallet-payment{
    width:100%;
    font-size:0.24rem;
    background:rgba(250,250,250,1);
    border-radius:0.12rem;
    border:0.01rem solid rgba(220,220,220,1);
    margin-top: 0.2rem;
  }
  .s-walletPayment-general{
    font-size:0.24rem;
    color:rgba(102,102,102,1);
    line-height:0.3rem;
    margin-top: 0.3rem;
    &.noMarT{
      margin-top: 0rem;
    }
  }
  .wallet-payment-title{
    display: flex;
    justify-content: space-between;
    width:100%;
    height:0.82rem;
    line-height: 0.82rem;
    padding: 0 0.3rem;
    &.active{
      background:rgba(1,121,89,0.1);
      .wallet-payment-title-text{
        font-weight:bold;
        color:$green;
      }
    }
  }
  .wallet-payment-title-text{
    font-size:0.26rem;
    color:rgba(17,17,17,1);
  }
  .wallet-payment-title-img{
    text-align: right;
    img{
      height:0.2rem;
      margin-right: 0.1rem;
      vertical-align: middle;
    }
    span{
      margin-left: 0.1rem;
    }
  }
  .wallet-payment-from{
    padding:0.3rem 0.2rem 0.4rem;
    // height: 4.8rem;
  }
  .wallet-payment-from-cardType{
    display: flex;
    flex-wrap:wrap;
  }
  .wallet-payment-from-cardType-select{
    width: 50%;
    height: 0.6rem;
    margin-bottom: 0.3rem;
  }
  .wallet-payment-info-label{
    width:2.4rem;
    height:0.6rem;
    line-height: 0.4rem;
    background:rgba(255,255,255,1);
    border-radius:0.08rem;
    border:0.01rem solid rgba(220,220,220,1);
    padding: 0.1rem 0 0.1rem 0.2rem;
    display: inline-block;
    box-sizing: border-box;
    .s-icon{
      margin-right: 0.2rem;
      vertical-align: middle;
    }
  }
  .wallet-payment-from-text{
    font-size:0.24rem;
    color:rgba(102,102,102,1);
    line-height:0.3rem;
    margin-bottom: 0.1rem;
  }
  .wallet-payment-from-select{
    width:6.2rem;
    height:0.6rem;
    background:rgba(255,255,255,1);
    border-radius:0.08rem;
    border:0.01rem solid rgba(220,220,220,1);
  }
  .wallet-payment-submit-btn{
    display: inline-block;
    text-align: center;
    width:6.2rem;
    height:0.84rem;
    background:rgba(227,164,40,1);
    border-radius:0.12rem;
    font-size:0.36rem;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:0.84rem;
    margin-top: 0.3rem;
  }
</style>
