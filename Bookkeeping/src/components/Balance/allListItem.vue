<template>
       <div class="title-style" slot="allListItem" >
            <div class="compayName" v-if="item.company_name != ''">{{item.company_name}}</div>
            <div class="compayName" v-else-if="item.company_name === ''">暂无</div>

            <span>{{item.updated_at}}</span>
            &nbsp;
            &nbsp;
            <div class="lessmonery" v-if="item.lessMoney == '0'">
              <span>暂无欠款</span>
            </div>
            <div class="lessmoneryNo" v-else-if="item.lessMoney !== '0' && item.type == '2'">
              <span class="lessmoneryNo-span">
                <span>欠款</span>
                <span>{{item.lessMoney}}</span>
              </span>
            </div>
            <div class="lessmonerysuc lessdivsuc" v-else-if="item.lessMoney !== '0' && item.type == '1'">
              <span class="lessmoneryNo-span">
                <span>待收</span>
                <span>{{item.lessMoney}}</span>
              </span>
            </div>
          </div>

         
</template>

<script type="text/ecmascript-6">
export default {
    props:{
        item:Object
    },
   name: '',
   data() {
       return {
         listactive:0
       }
   },
  components: {}
}
</script>

<style lang="less">

</style>
