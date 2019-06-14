<template>
  <div class="wrapper">
    <el-button type="primary" plain class="nn" @click="xin()" v-if="show">新建</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" prop="date" label="序号" width="60"></el-table-column>
      <el-table-column prop="tit" label="题目" width="180"></el-table-column>
      <el-table-column prop="time" label="注册时间">
        <template slot-scope="scope">{{ scope.row.time.substr(0,10)}}</template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope" >
          <el-button size="mini" @click="handleEdit(scope.row.id)" v-if="show">编辑</el-button>
          <el-button size="mini" type="danger" @click="open(scope.row.id)" v-if="show">删除</el-button>

          <el-button size="mini" @click="handleEdit(scope.row.id)" v-if="user">查看</el-button>

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
  data() {
    return {
        tableData:[],
        show:Boolean,
        user:false
    };
  },
  watch: {},
  computed: {},
  methods: {open2(z) {
      this.$message({
        message: z,
        type: "success"
      });
    },
    quanbujingyong(id){
        this.$router.push(this.$route.path + "/create/" + '-2');
    },
    // 弹出框提示
    open(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: API.delNews,
            params: { id }
          }).then(d => {
            this.init()
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
    xin() {
      this.$router.push(this.$route.path + "/create/0");
    },

// 查询当前数据库所有数据
    init() {
      this.$http({
        url: API.findNews
      }).then(e => {
        // console.log(e)
        this.tableData = e.data.data;
        // console.log(e.data);
      });
    }
  },
  mounted() {
  this.init()
  var a=JSON.parse(localStorage.getItem('add')) 
  if (!a) {
      this.$router.push("/");
     this.open2("╭❤～亲，请先登录╭❤～");
     return
    } else {
      if(a.type==2){
          this.show=false;
          this.show2=false
          this.user=true
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