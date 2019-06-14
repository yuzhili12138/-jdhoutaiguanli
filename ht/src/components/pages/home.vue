<template>
  <div class="wrapper">
    <div class="header">
      <div>
        <div class="back" @mouseover="jinqu()" @mouseleave="chulai()">
          <div class="name" v-if="userName==''">{{name}}</div>

          <div class="name" v-if="userName">{{userName}}</div>

          <div class="tuichu" v-show="show" @click="tui()">退出登录</div>
        </div>

        <div class="header_right">
          <img src="../../common/images/16.jpg" alt>
        </div>
      </div>
    </div>

    <!-- 退出登录 -->

    <v-main class="main"></v-main>
  </div>
</template>

<script type="text/ecmascript-6">
import vMain from "../pages/main";
import API from "../../common/js/API";
export default {
  components: {
    vMain
  },
  props: {},
  data() {
    return {
      show: false,
      name: "",
      userName:''
    };
  },
  watch: {},
  computed: {},
  methods: {
    chulai() {
      this.show = false;
      this.$(".back").css("background-color", "");
    },
    jinqu() {
      this.$(".back").css("background-color", "white");
      //  console.loe(this.show)
      this.show = true;
    },
    open2(z) {
      this.$message({
        message: z,
        type: "success"
      });
    },
    tui() {
      this.$http({
        url: API.exit
      }).then(e => {
        this.$router.push("/");
        this.open2("退出成功");
        localStorage.removeItem('add')
      });
    }
  },
  mounted() {
    var a=JSON.parse(localStorage.getItem('add'))
   if(!JSON.parse(localStorage.getItem('add'))){
     this.$router.push("/");
     this.open2("(づ￣3￣)づ╭❤～,请先登录");
     return
   }

      this.$http({
          url:API.findUser,
          params:{
            idx:a.name,
            pass:a.pass
          }
      }).then(d=>{
        if(d.data.data.length>0){
               this.userName=d.data.data[0].name
          }     
          })


     this.name=a.name



  },

};
</script>
<style lang='stylus' scoped>
@import '../../common/styl/index.styl';

.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  width: 100vw;
  height: 59px;
  background: rgba(88,69,35,0.1);
  
  border-bottom: 1px solid #666;
  position: fixed;
  left: 0;
  top: 0;
  z-index 10  

  .header_right {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      float: right;
      margin-top: 10px;
    }
  }

  .back {
    float: right;
    height: 100%;
    font-size: 20px;
    margin: 0 20px;
    width: 100px;
    text-align: center;
    cursor: pointer;

    .name {
      line-height: 60px;
    }

    .name:hover {
      background: white;
      border-bottom: 1px solid #666;
    }
  }
}

.tuichu {
  width: 120px;
  height: 60px;
  position: fixed;
  right: 19px;
  top: 60px;
  background: white;
  line-height: 60px;
  text-align: center;
  font-size: 15px;
  // border 1px solid red
}

.main {
  margin-top: 60px;
  flex: 1;
}
</style>