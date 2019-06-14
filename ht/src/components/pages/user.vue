<template>
  <div class="wrapper">
    <el-button type="primary" plain class="nn" @click="xin()">新建</el-button>
    <div class="dongxi">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="name" label="账号" width="120"></el-table-column>
        <el-table-column prop="tel" label="电话" width="200"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="sex" label="性别" width="100"></el-table-column>
        <el-table-column prop="idx" label="生份证号" width="300"></el-table-column>
        <el-table-column prop="des" label="备注" width="200"></el-table-column>
        <el-table-column prop="time" label="生日" width="200">
          <template slot-scope="scope">{{ scope.row.time|timer}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="open(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
export default {
  components: {},
  props: {},
  data() {
    return {
      user: {
        name: "",
        pass: "",
        tel: "",
        email: "",
        sex: "",
        idx: "",
        des: "",
        time: ""
      },
      tableData: [],
     
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
      handleEdit(id) {
      this.$router.push(this.$route.path + "/create/" + id);
    },
    xin() {
      this.$router.push(this.$route.path + "/create/0");
    },
    open(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: API.delUser,
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
    init() {
      this.$http({
        url: API.findUser
      }).then(d => {
        this.tableData = d.data.data;
      });
    }
  },
  mounted() {
      this.init()

       var a=JSON.parse(localStorage.getItem('add')) 
  if(!a){
     this.$router.push("/");
     this.open2("╭❤～亲，请先登录╭❤～");
  }

  

     
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/styl/index.styl';

.dongxi {
  margin-top: 20px;
  width: 1000px;
}
</style>