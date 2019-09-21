<template>
   <div class="index-top-btn">
       <slot name="bintu"></slot>
       <slot name="xianz"></slot>
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
.index-top-btn{
    display:flex;
    position:absolute;
    top:30px;
    width: 100px;
    z-index:999;
    height: 30px;
    border: 1px solid white;
    border-radius: 20px;
    margin-left: 8%;
}
.index-top-btn>a:nth-of-type(2){
    display:block;
    width: 50%;
    color:white;
    font-size: 30px;
    border-top-right-radius:14px;
    border-bottom-right-radius:14px;
}
.index-top-btn a:nth-of-type(1){
    border-top-left-radius:15px;
    border-bottom-left-radius:15px;
    background-color: white;
    color:orange;
    display:block;
    width: 50%;
    font-size: 30px;
}
</style>
