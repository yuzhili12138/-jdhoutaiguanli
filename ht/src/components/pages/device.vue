<template>
  <div class="wrapper">
    <el-button type="primary" plain class="nn" @click="xin()" v-if="show">新建</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" prop="date" label="序号" width="60"></el-table-column>
      <el-table-column prop="ip" label="ip" width="180"></el-table-column>
      <el-table-column prop="door" label="机房"></el-table-column>
      <el-table-column prop="num" label="编号"></el-table-column>
      <el-table-column prop="width" label="宽带"></el-table-column>
      <el-table-column prop="status" label="使用"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" >
          <el-button size="mini" @click="handleEdit(scope.row.id)" v-if="show">查看</el-button>
          <el-button size="mini" type="danger" @click="open(scope.row.id)" v-if="show">删除</el-button>

          <el-button   size="mini" type="primary" :disabled='scope.row.status=="已出售"' @click="mai(scope.row.id)" v-if="!show">购买</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
export default {
 components: {},
 props: {},
 data () {
 return {
     tableData:[],
     show:Boolean,
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
    mai(id){
        this.$http({
          url:API.updateDevice,
          params:{
            id,
            status:'已出售'
          }
        }).then(e=>{
          this.open2('购买成功')
          this.init()
        })
    }
   ,
     xin() {
      this.$router.push(this.$route.path + "/create/0");
    },
    init() {
      this.$http({
        url: API.findDevice
      }).then(d => {
        console.log(d.data.data)
        this.tableData = d.data.data;
      });
    },
    
    open(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: API.findDevice,
            params: { id }
          }).then(d => {
            this.init();
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    
    handleEdit(id) {
      this.$router.push(this.$route.path + "/create/" + id);
    },
 },
 mounted () {
   this.init()

    var a=JSON.parse(localStorage.getItem('add')) 
  if(!a){
     this.$router.push("/");
     this.open2("╭❤～亲，请先登录╭❤～");
  }else{
    if(a.type==2){
        this.show=false
      }
  }

  
      

 },
};
</script>
<style lang='stylus' scoped>
@import '../../common/styl/index.styl';
.nn
    margin-bottom 20px
</style>