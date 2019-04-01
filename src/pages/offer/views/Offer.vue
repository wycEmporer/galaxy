<template>
  <div class="offer_box">
    <OfferTop />
    <div class="offer_list" >
      <template v-for="(item, index) in advList" >
        <OfferList :key="index" :offerInfo="item" />
      </template>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { getAdvertising } from '@/constants/ApiConstants';
export default {
  name: 'Offer',
  components: {
    OfferTop: () => import('./OfferTop'),
    OfferList: () => import('./OfferList')
  },
  data () {
    return {
      advList: []
    };
  },
  created () {
    let url = `${getAdvertising}?type=13&device=0`
    this.$http(url).then(res => {
      if (res.success && res.list instanceof Array) {
        this.advList = res.list;
      } else {
        Toast(res);
      }
    })
  }
};
</script>
<style lang="scss" scoped>
.offer_list{
  padding:0.3rem;
}
</style>
