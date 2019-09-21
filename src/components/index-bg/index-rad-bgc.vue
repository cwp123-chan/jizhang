<template>
   <div class="index-rad-bgc">
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
.index-rad-bgc{
    width: 300px;
    height: 300px;
    border-radius: 100%;
    // border: 1px solid #000;
    margin-left: 10%;
    margin-top:-320px;
    box-shadow:0px 0px 3px 1px orange;
    
    background-color: #fff;

}
.index-rad-bgc>div{
    // width: 100px;
    // height:100px;
    // border: 1px solid #000;
    margin-left: -20%;
    margin-top: 20%;
}
</style>
