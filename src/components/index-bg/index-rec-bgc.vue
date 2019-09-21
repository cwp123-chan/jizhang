<template>
   <div class="index-rec-bgc">
       <slot></slot>
   </div>
</template>

<script type="text/ecmascript-6">
export default {
   name: '',
   data() {
       return {}
   },
  components: {}
}
</script>

<style lang="less">
.index-rec-bgc{
    width: 300px;
    height: 235px;
    // border: 1px solid orange; 
    box-shadow:0px 0px 3px 1px orange;

     margin-left: 8%;
    margin-top:-270px;
    border-radius: 10px;
    background-color: #fff;

}
</style>
