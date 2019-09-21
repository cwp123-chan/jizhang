<template>
   <div class="index-top-bgc">
       <slot name="index-top-bgc-title"></slot>
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
.index-top-bgc{
    width: 100%;
    height:390px;
    background-color: orange;

}
</style>
