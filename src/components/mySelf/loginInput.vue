<template>
   <div class="moblie-header">
       <div class="mobile-title">
           <slot name="mobile-title-login"></slot>
       </div>
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
.moblie-header{
    display:flex;
    justify-content: flex-start;
    align-items: center;
    width:90%;
    height: 40px;
    padding-left: 5%;
    margin-left: 2%;
    border-bottom: 1px solid #e8e8e8;
}
</style>
