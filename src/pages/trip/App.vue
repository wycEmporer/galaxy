<template>
  <div class="trip_box">
    <HeaderTop header-title="My trip" goBack="true"></HeaderTop>
    <router-view></router-view>
    <CancelModel v-show="showCancelModel" :flightOrderIdString="flightOrderIdString" />
  </div>
</template>
<script>
import HeaderTop from '@/components/Header.vue';
import EventHub from '@/utils/EventHub';
export default {
  components: {
    HeaderTop,
    CancelModel: () => import('./views/CancelModel')
  },
  data () {
    return {
      showCancelModel: false,
      flightOrderIdString: ''
    }
  },
  created () {
    EventHub.$on('showCncelModel', (data) => {
      this.showCancelModel = true;
      this.flightOrderIdString = data;
    });
    EventHub.$on('hideCancelModel', () => {
      this.showCancelModel = false;
    });
    EventHub.$on('hideCancelModelSucc', () => {
      this.showCancelModel = false;
      this.$store.dispatch('selectDiffStatus', 2);
    });
  },
  destroyed () {
    EventHub.$off('showCncelModel');
    EventHub.$off('hideCancelModel');
  }
};
</script>
<style lang="scss">
@import '~@/assets/css/common.scss';
@import '~@/assets/css/sprite.css';
@import '~@/assets/fonts/iconfont.css';
.trip_box{
  height:100%;
  // overflow: auto;
}
</style>
