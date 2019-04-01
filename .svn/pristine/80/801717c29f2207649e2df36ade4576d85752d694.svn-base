<template>
  <div class="traveler-details">
    <p class="traveler-details-title">Traveler Details</p>
    <p class="traveler-details-import">Important: Please enter names as mentioned on your government ID proof.</p>
    <travelersInfo :flightInfo = 'flightInfo'></travelersInfo>
    <contactInfo></contactInfo>
    <insureInfo :flightInfo = 'flightInfo'></insureInfo>
  </div>
</template>

<script>
import travelersInfo from './TravelersInfo'
import contactInfo from './ContactInfo'
import insureInfo from './InsureInfo'
export default {
  props: ['flightInfo'],
  data () {
    return {

    }
  },
  components: {
    travelersInfo,
    contactInfo,
    insureInfo
  }
}
</script>

<style lang="scss" scoped>
  .traveler-details{
    padding: 10px 15px;
  }
  .traveler-details-title{
    font-size: 14px;
    line-height: 30px;
    color: $lightBlack;
    font-weight: 700;
  }
  .traveler-details-import{
    color: $lightBlack;
    font-size: 10px;
    line-height: 15px;
  }
</style>
