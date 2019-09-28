<template>
    <div class="Balance-body-list" slot="balanceInmoney" >
            <div class="Balance-body-icon" >
                <van-icon v-if="icon =='bill' " name="bill" size="25px" color="#ec5959" />
                <van-icon v-if="icon =='balance-list' " name="balance-list" size="25px" color="#ec5959" />
                <van-icon v-if="icon =='medel' " name="medel" size="25px" color="#ec5959" />
                <van-icon v-if="icon =='card' " name="card" size="25px" color="#ec5959" />
                <van-icon v-if="icon =='gold-coin' " name="gold-coin" size="25px" color="#ec5959" />
                &nbsp;{{mark}}
            </div>
            <div class="Balance-body-icon">
            {{inMoney}}
            <van-icon name="arrow" />
            </div>
    </div>
            
</template>

<script type="text/ecmascript-6">
export default {
    props:['inMoney','mark','icon'],
   name: '',
   data() {
       return {

       }
   },
  components: {}
}
</script>

<style lang="less">

</style>
