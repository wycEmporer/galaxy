<template>
  <div>
    <HeaderTop header-title="Flights" goBack="true">
      <!-- <span slot="title_center" class="">Flight</span> -->
    </HeaderTop>
    <keep-alive>
     <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

  </div>
</template>
<script>
import HeaderTop from '@/components/Header.vue';

export default {
  components: {
    HeaderTop
  }
};
</script>

<style lang="scss">
@import '~@/assets/css/common.scss';
@import '~@/assets/css/sprite.css';
@import '~@/assets/fonts/iconfont.css';
</style>
