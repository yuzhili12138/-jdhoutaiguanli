<template>
  <div class="wrapper">
    <div class="bg">

    
    <div class="login">
      <div class="login_head">登录</div>

      <el-select v-model="user.type" placeholder="请选择" >
        <el-option v-for="item in options" :key="item.value"
         :label='item.value'
         :value="item.type" ></el-option>
      </el-select>

    <div>
        <el-input placeholder="请输入账号" v-model="user.name"></el-input>
        <el-input placeholder="请输入密码" v-model='user.pass'></el-input>
    </div>
      
    <el-button type="primary" @click='login()'>登录</el-button>
    </div>


    <!-- <el-button :plain="true" @click="open3">警告</el-button> -->

</div>

  </div>
</template>

<script type="text/ecmascript-6">
import API from '../../common/js/API'
export default {
  components: {},
  props: {},
  data() {
    return {
        user:{
            name:'',
            pass:'',
            type:''
        },
     
      options: [
        {
          type: 0,
          value: "超级管理员"
        },
        {
          type: 1,
          value: "普通管理员"
        },
        {
          type: 2,
          value: "用户"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    open2(z) {
        this.$message({
          message: z,
          type: 'success'
        });
      },
       open3(zhi) {
        this.$message({
          message: zhi,
          type: 'warning'
        });
      },   
      login(){
          var data=this.user
          // console.log(data)
          data=this.$qs.stringify(data)
          this.$http({
              url:API.login,
              method:'post',
              data:data
          }).then(d=>{  
              // console.log(d)
            if(!d.data.isok){
                this.open3(d.data.info)
            }else{
                this.$router.push('/home')
                this.open2('登录成功')   
                localStorage.setItem('add',JSON.stringify(this.user))
            }
          })

      }
  },
  mounted() {},
  // beforeDestroy() {
  //   this.ev.$emit("a",this.user)
  // },
};
</script>
<style lang='stylus' scoped>
@import '../../common/styl/index.styl';

.wrapper
  width: 100vw;
  height: 100vh;
  background url('../../common/images/1.jpg') no-repeat
  background-size cover
  .login 
    
    width: 400px;
    height: 300px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background-color: rgba(255,255,255,0.7);
    text-align center
    .login_head
        width 100%
        text-align center
        font-size 26px
        padding 15px 0px  
        color #1989fa
        border-bottom 1px solid skyblue
        

.el-select
    display block!important
    padding 10px 20px
    
.el-input
    // width 400px!important;
    display block!important;
    padding 10px 20px!important;
>>>.el-input__inner
    display block!important;
    width 361px!important
    // width 100%!important
    // padding 10px 20px
</style>