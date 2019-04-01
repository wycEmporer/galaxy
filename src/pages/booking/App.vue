<template>
  <div class="booking-warp">
    <HeaderTop header-title="Booking" goBack="true">
      <!-- <span slot="title_center" class="">Flight</span> -->
    </HeaderTop>
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderTop from '@/components/Header.vue';

export default {
  data () {
    return {

    }
  },
  components: {
    HeaderTop,
  },
  created () {
    // 刷新页面 回到顶部
    window.addEventListener('beforeunload', this.fn);
  },
  methods: {
    fn () {
      window.scrollTo(0, 0);
    },
  }

};
</script>

<style lang="scss">
@import '~@/assets/css/common.scss';
@import '~@/assets/css/sprite.css';
.booking-warp{
  height: 100%;
  overflow: auto;
}
  .gray{
    color: $gray;
  }
  .a_link{
    color: $green;
    text-decoration: underline;
  }
</style>
