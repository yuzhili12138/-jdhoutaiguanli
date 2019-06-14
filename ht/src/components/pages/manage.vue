<template>
  <div class="wrapper">
    <el-button type="primary" plain class="nn" @click="xin()">新建</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"  label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="账号" width="180"></el-table-column>
      <el-table-column prop="prop" label="属性"></el-table-column>
      <el-table-column  label="注册时间">

        <template slot-scope="scope">{{ scope.row.time | timer}}</template>
        
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="open(scope.row.id)">删除</el-button>
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
      tableData: []
    };
  },
  filters:{
      aa:function(a){
          return a.substr(0,10)
      }
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
    // 弹出框提示
    open(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: API.delManage,
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
    xin() {
      this.$router.push(this.$route.path + "/create/0");
    },

    // 查询当前数据库所有数据
    init() {
      this.$http({
        url: API.findManage
      }).then(e => {
        this.tableData = e.data.data;
      });
    }
  },
  mounted() {
    this.init();

    var a = JSON.parse(localStorage.getItem("add"));
    if (!a) {
      this.$router.push("/");
      this.open2("╭❤～亲，请先登录╭❤～");
    }
  },
  beforeRouteEnter(to, from, next) {
    var a = JSON.parse(localStorage.getItem("add"));
    next(vm => {
      if (a.type == "2") {
        vm.$router.replace('/')
        vm.open2("权限不足");
      } else {
        next();
      }

    });
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/styl/index.styl';

.nn {
  margin-bottom: 30px;
}
</style>