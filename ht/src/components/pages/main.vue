<template>
 <div class="wrapper">

     <!-- <div class="n1">asdasd</div>
     <router-view class="n2"></router-view> -->
    <v-left class="left" :aa='shuju'></v-left>

    <v-right class="right"></v-right>
     
 </div>
</template>

<script type="text/ecmascript-6">
import vLeft from '../views/left'
import vRight from '../views/right'

export default {
 components: {
     vLeft,vRight
 },
 props: {},
 data () {
 return {
     shuju:{}
 };
 },
 watch: {},
 computed: {},
 methods: {},
 mounted () {
      
 }
};
</script>
<style lang='stylus' scoped>
@import '../../common/styl/index.styl';
.wrapper
    display flex
    width 100%
    flex-direction row
    .left
        width 200px
        background-color rgba(0,0,0.0.1)
        // height 100%
    .right
        background #ffffff
        flex 1
</style>