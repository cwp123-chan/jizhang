<template>
   <div class="addCenterInputItem">
       <div class="addCenterInputItem-title">
           <slot name="addCenter-title"></slot>
       </div>
       <div class="addCenterInputItem-input">
           <slot name="addCenter-input"></slot>
       </div>
       
       <div class="addCenterInputItem-icon">
           <slot name="addCenter-icon"></slot>
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
.addCenterInputItem{
    display:flex;
    // justify-content: center;
    align-items: center;
    height:30px;
    width:100%;
    margin-left: -80px;
    font-size: 24px;
    margin-top: 30px;

}
.addCenterInputItem>div:nth-of-type(1){
    text-align: right;

    width:200px;
    height:100%;
}
.addCenterInputItem>div:nth-of-type(2){
    width:200px;
    height:100%;
    margin-top:5px;
    color:#676767;
    margin-left: 10%;
}
.addCenterInputItem>div:nth-of-type(3){
    width:50px;
    height:100%;
    margin-top:17px;

}

.addCenterInputItem>div>span{
    overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
    display: block;
    text-align: right;
    // vertical-align: middle;
    width:100%;
    height:100%;
    margin-left: -8%;
    color:#ec5959;
    // border: 1px solid #000;
}

</style>
