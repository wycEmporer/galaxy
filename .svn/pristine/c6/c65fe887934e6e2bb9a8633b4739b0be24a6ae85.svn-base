<template>
  <div class="save-ups">
    <div class="save-up" :class="`bg-${index%3}`" v-for="(item, index) in list" :key="index">
      <div class="save-up-title">
        {{item.discount}}
      </div>
      <div class="save-up-text">
        {{item.description}}
      </div>
    </div>
  </div>
</template>
<script>
import { couponProm } from '@/constants/ApiConstants';
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getCouponList () {
      this.$http.post(couponProm, { 'device': 1, 'page': 1, 'pageSize': 100 }).then(res => {
        if (res.data.length !== 0) {
          this.list = res.data;
        }
      })
    }
  },
  created () {
    this.getCouponList();
  }
}
</script>

<style lang="scss" scoped>
.save-ups{
  padding: 0.1rem 0.3rem;
}
.save-up{
  width: 100%;
  height: 1.6rem;
  margin-bottom: 0.2rem;
  padding: 0.4rem;
  border-radius:0.24rem;
  &.bg-0{
    background:linear-gradient(270deg,rgba(160,108,220,1) 0%,rgba(103,58,183,1) 100%);
  }
  &.bg-1{
    background:linear-gradient(270deg,rgba(131,216,136,1) 0%,rgba(76,175,80,1) 100%);
  }
  &.bg-2{
    background:linear-gradient(270deg,rgba(255,201,0,1) 0%,rgba(255,152,0,1) 100%);
  }
}
.save-up-title{
  font-size: 0.32rem;
  color: #fff;
  font-weight: bold;
  margin-bottom: 0.1rem;
}
.save-up-text{
  font-size: 0.24rem;
  color: #fff;

}
</style>
