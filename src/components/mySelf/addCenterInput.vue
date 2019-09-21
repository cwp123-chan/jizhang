<template>
   <div class="addCenter">  
       <slot></slot>
       <div class="changeLoginUser">
           <slot name="changeLoginUser"></slot>
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
.addCenter{
    // border: 1px solid #000;
    height:30px;
    width:100%
}

</style>
