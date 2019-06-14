<template>
 <div class="wrapperr">

     <h3>{{ $route.name }}</h3>
     <router-view></router-view>
<div class="box">
</div>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
 components: {},
 props: {},
 data () {
 return {
 };
 },
 watch: {},
 computed: {},
 methods: {},
 mounted () {
    //  console.log(this.$route)
 }
};
</script>
<style lang='stylus' scoped>
@import '../../common/styl/index.styl';
.wrapperr{
    padding 20px
    margin-left 200px
}
h3  
    height 40px
    font-size 28px
    display block
    margin-bottom 30px
.box 
    text-align center
    line-height 100px
    font-size 80px
    padding 100px    
</style>