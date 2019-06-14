<template>
  <div class="wrapper">
    <el-form label-width="80px" id="fromin">
      <el-form-item label="题目">
        <el-input v-model="shuju.tit" :disabled='bian'></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <el-input type="textarea" v-model="shuju.con" :disabled='bian'></el-input>
      </el-form-item>

      <el-form-item label="时间">
        <div class="block">
          <el-date-picker v-model="shuju.time" type="date" placeholder="选择日期" :disabled='bian'></el-date-picker>
        </div>
      </el-form-item>


      <div class="box" v-if="gg">
        <el-button type="primary" @click="register()">添加</el-button>
        <el-button type="primary" @click="back()">返回</el-button>
      </div>
       <div class="box2" v-if='mm'>
          <el-button type="primary" @click="upDate()" :disabled='bian'>修改</el-button>
          <el-button type="primary" @click="back()">返回</el-button>
       </div>


    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
export default {
  components: {},
  props: {},
  data() {
    return {
      shuju: {
        tit: "",
        con: "",
        time: ""
      },
      gg: Boolean,
      mm:Boolean,
      bian:false
    };
  },
  watch: {},
  computed: {},
  methods: {
    open2(z) {
      this.$message({
        message: z,
        type: "success"
      });
    },
    open3(zhi) {
      this.$message({
        message: zhi,
        type: "warning"
      });
    },
    open1(z) {
      this.$message(z);
    },
    register() {
      console.log(this.shuju);
      let data = this.shuju;
      this.$http({
        url: API.addNews,
        params: data
      }).then(d => {
        if (!d.data.isok) {
          this.open3(d.data.info);
        } else {
          this.$router.push("/home/news");
          this.open2("添加成功");
        }
      });
    },
    back() {
      this.$router.go(-1);
    },

    upDate(){

      var id=this.$route.params.id
        this.$http({
          url:API.updateNews,
          params:{
            id:id,
             tit:this.shuju.tit,
             con:this.shuju.con,
             time:this.shuju.time
          }
        }).then(d=>{
          this.$router.push('/home/news')
          this.open2('更新成功')
          
        }).catch(e=>{
          console.log(e)
        })
    }

  },
  mounted() {
    // 判断有是不是用户
    var a=JSON.parse(localStorage.getItem('add'))
        if(a.type==2){
          this.bian=true;  
        }

    if (this.$route.params.id != 0) {
       this.gg=false,
       this.mm=true
      var id = this.$route.params.id;
      this.$http({
        url: API.findNews,
        params: { id }
      }).then(d => {
        this.shuju.tit = d.data.data[0].tit;
        this.shuju.con = d.data.data[0].con;
        this.shuju.time = d.data.data[0].time;
      });
    }else{
        this.gg=true
       this.mm=false
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/styl/index.styl';

.box {
  width 950px!important
  text-align: center;
}

.el-input {
  width: 800px;
}

// .box1 {
//   text-align: left !important;
// }

.el-textarea {
  width: 800px;
}
.box2{
  width: 950px;
  text-align: center;
}
</style>