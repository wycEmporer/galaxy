<template>
  <div>
    <div class="payment-method">
      <p class="payment-method-title">Select Payment Method</p>
      <cardPayment @eventCardPay="paymentMethod" :showType = "payType == 'card' ? true : false" @confirmpaymentH="confirmpaymentH"></cardPayment>
      <bankPayment :netBank="netBank" @eventBankPay="paymentMethod" :showType = "payType == 'bank' ? true : false" @confirmpaymentH="confirmpaymentH"></bankPayment>
      <walletPayment :wallet="wallet" @eventWalletPay="paymentMethod" :showType = "payType == 'wallet' ? true : false" @confirmpaymentH="confirmpaymentH"></walletPayment>
      <upiPayment :UPI="UPI" @eventUpiPay="paymentMethod" :showType = "payType == 'upi' ? true : false" @confirmpaymentH="confirmpaymentH"></upiPayment>
    </div>
  </div>
</template>
<script>
import cardPayment from './cardPayment';
import bankPayment from './bankPayment';
import walletPayment from './walletPayment';
import upiPayment from './upiPayment';
import { paymentH } from '@/constants/ApiConstants';
import { Toast, Indicator } from 'mint-ui';
export default {
  components: {
    cardPayment,
    bankPayment,
    walletPayment,
    upiPayment
  },
  props: ['paymentChannel', 'orderId'],
  data () {
    return {
      errMsg: '',
      payType: '',
      payTip: '',
      submiturl: '',
      credit: {
        isShow: false,
        content: ''
      },
      debit: {
        isShow: false,
        content: ''
      },
      netBank: {
        isShow: false,
        content: '',
        bankList: null,
        description: '',
        selectId: '',
        hotBank: null
      },
      wallet: {
        isShow: false,
        content: '',
        walletList: null,
        description: '',
        selectId: ''
      },
      EMI: {
        isShow: false,
        content: ''
      },
      UPI: {
        isShow: false,
        content: '',
        email: '',
      },
      paypal: {
        isShow: false,
        content: ''
      },
      failPop: {
        code: 0,
        show: false,
        msg: ''
      }
    }
  },
  watch: {
    paymentChannel (val) {
      if (val) this.getPaywayInfo();
    }
  },
  methods: {
    paymentMethod (flag) {
      this.payType = flag;
    },
    confirmpaymentH (payTransactionMapEncode) {
      let params = {
        orderId: this.$Base64.encode(this.orderId)
      };
      Object.assign(params, { payTransactionMapEncode });
      params.payTransactionMapEncode = this.$Base64.encode(JSON.stringify(params.payTransactionMapEncode));
      this.$http.post(paymentH, params, {
        headers: {
          'Content-Type': 'application/json',
          'x-Device': 'mobile'
        }
      }).then(res => {
        Indicator.close();
        if (res.success) {
          if (res.code === 1) {
            this.submiturl = res.submiturl;
            if (res.payWay === 4) {
              this.razorpay(res);
            } else {
              this.hdfc(res.data);
            }
          } else if (res.code === 0) {
            this.$router.replace('/payment-state?orderid=' + this.orderId + '&phoneNo=' + (this.phoneNo || this.contactPhone));
          } else if (res.code === 10) {
            this.errMsg = res.msg;
          } else if (res.code === 5) {
            this.failPop.code = 5;
            this.failPop.show = true;
            this.failPop.msg = res.msg;
          } else if (res.code === 7) {
            if (res.msg === '' || res.msg == null) {
              this.failPop.show = false;
            } else {
              this.failPop.code = 7;
              this.failPop.show = true;
              this.failPop.msg = res.msg;
            }
          } else {
            this.failPop.show = true;
            this.failPop.msg = res.msg;
          }
        } else {
          Toast({
            message: 'status:' + res.code + ' message:' + res.msg,
            duration: 10000
          });
        }
      })
    },
    razorpay (params) {
      let razorpay = new window.Razorpay({
        key: params.data.appId,
        callback_url: params.data.returnUrl,
        redirect: true
      });
      razorpay.createPayment(params.data.data);
    },
    hdfc (params, target) {
      var tempform = document.createElement('form');
      tempform.action = this.submiturl;
      tempform.method = 'post';
      tempform.style.display = 'none';
      if (target) {
        tempform.target = target;
      }

      for (var x in params) {
        let opt = document.createElement('input');
        opt.name = x;
        opt.value = params[x];
        tempform.appendChild(opt);
      }

      let opt = document.createElement('input');
      opt.type = 'submit';
      tempform.appendChild(opt);
      document.body.appendChild(tempform);
      tempform.submit();
      document.body.removeChild(tempform);
    },
    getPaywayInfo () {
      this.payTip = this.paymentChannel.content;
      this.paymentChannel.channel.forEach((val, key) => {
        switch (val.id) {
          case 1:
            this.credit.isShow = true;
            this.credit.content = val.content;
            break;
          case 2:
            this.debit.isShow = true;
            this.debit.content = val.content;
            break;
          case 3:
            this.netBank.isShow = true;
            this.netBank.bankList = val.bankList;
            this.netBank.content = val.content;
            this.netBank.hotBank = val.bankList.filter(e => {
              return !!e.bankpic;
            })
            break;
          case 4:
            this.wallet.isShow = true;
            this.wallet.content = val.content;
            if (val.walletList.length > 0) {
              this.wallet.walletList = val.walletList;
              this.wallet.selectId = val.walletList[0].id;
              this.wallet.description = val.walletList[0].content;
            }
            break;
          case 5:
            this.EMI.isShow = true;
            this.EMI.content = val.content;
            break;
          case 6:
            this.UPI.isShow = true;
            this.UPI.content = val.content;
            break;
          case 7:
            this.paypal.isShow = true;
            this.paypal.content = val.content;
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  .payment-method{
    padding: 0.3rem;
  }
  .payment-method-title{
    font-size:0.28rem;
    font-weight:bold;
    color:rgba(102,102,102,1);
    line-height:0.35rem;
  }
</style>
