<template>
   <div class="md-item-header">
       <slot name="md-title-input"></slot>
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
.md-item-header{
    display:flex;
    justify-content: space-between;
    height:30px;
    // border: 1px solid #000;
}
</style>
