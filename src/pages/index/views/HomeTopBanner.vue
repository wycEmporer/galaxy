<template>
  <div class="top-banner">
    <!-- <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(item, index) in topBanners" :key="index" >
        <a :href="item.href" style="height:100%;width:100%;cursor:pointer;">
          <img class="banner-img" :src="item.landingPageUrl">
        </a>
      </mt-swipe-item>
    </mt-swipe> -->
    <img class="banner-img" :src="(this.topBanners[0]|| {}).landingPageUrl" alt="">
  </div>
</template>
<script>
// import { Swipe, SwipeItem } from 'mint-ui';
import { advList } from '@/constants/ApiConstants';

export default {
  // components: {
  //   'mt-swipe': Swipe,
  //   'mt-swipe-item': SwipeItem
  // },
  data () {
    return {
      topBanners: []
    };
  },
  methods: {
    getHomeTopBanner () {
      const url = advList + '?type=33&device=0';
      this.$http(url).then(res => {
        if (res.success && res.list instanceof Array && res.list.length >= 1) {
          this.topBanners = res.list;
        }
      }).catch(() => {
      });
    }
  },
  created () {
    this.getHomeTopBanner();
  }
};
</script>
<style lang="scss" scoped>
  .top-banner{
    height: 1.6rem;
  }
  .banner-img{
    width: 100%;
    height: 100%;
  }
</style>
