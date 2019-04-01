<template>
  <div>
    <paymentInfo :orderId="orderId" :totalAmount="totalAmount"></paymentInfo>
    <paymentMethod :paymentChannel="paymentChannel" :orderId="orderId" ></paymentMethod>
  </div>
</template>

<script>
import paymentInfo from './paymentInfo';
import paymentMethod from './paymentMethod';
import { Toast, Indicator } from 'mint-ui';
import { queryOrderDetail, queryPaymentChannel } from '@/constants/ApiConstants';
export default {
  props: ['orderId', 'phoneNo'],
  data () {
    return {
      totalAmount: '',
      paymentChannel: []
    };
  },
  methods: {
    queryOrderDetail () {
      let url = `${queryOrderDetail}?orderId=${this.orderId}&phoneNo=${this.phoneNo}`;
      return new Promise((resolve, reject) => {
        this.$http(url).then(res => {
          if (res.code === 0 && res.data) {
            resolve(res);
          } else {
            Toast(res.message);
            reject(res);
          }
        })
      })
    },
    queryPaymentChannel () {
      let url = `${queryPaymentChannel}`;
      return new Promise((resolve, reject) => {
        this.$http(url, {
          headers: {
            'x-Device': 'mobile'
          }
        }).then(res => {
          if (res.success && res.channel instanceof Array && res.channel.length > 0) {
            resolve(res);
          } else {
            Toast(res.content);
            reject(res);
          }
        })
      })
    }
  },
  components: {
    paymentInfo,
    paymentMethod
  },
  created () {
    Indicator.open({
      spinnerType: 'fading-circle'
    });
    Promise.all([ // if success ,returns an array in request order.
      this.queryOrderDetail(),
      this.queryPaymentChannel()
    ]).then(res => {
      Indicator.close();
      this.totalAmount = res[0].data.order.payamount;
      this.paymentChannel = res[1];
    }).catch(err => { // if fail , returns the first fail reject.
      console.log(err)
    })
  }
};
</script>
