<template>
  <div class="wrapper">
    <div v-if="Show">
      <el-form label-width="80px" :rules="rules" ref="from" :model="from">
        <el-form-item label="账号" prop="name">
          <el-input v-model="from.name"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input type="password" autocomplete="off" v-model="from.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" autocomplete="off" v-model="pass2"></el-input>
        </el-form-item>

        <el-form-item label="属性">
          <el-input v-model="from.prop"></el-input>
        </el-form-item>

        <el-form-item label="注册时间">
          <div class="block">
            <el-date-picker v-model="from.time" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <div class="box">
          <el-button type="primary" @click="register('from')">注册</el-button>
          <el-button type="primary" @click="back()">返回</el-button>
        </div>
      </el-form>
    </div>

    <div class="youdianmeide" v-if="old">
      <el-form label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="shuju.name" disabled></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input type="password" autocomplete="off" v-model="shuju.pass" disabled></el-input>
        </el-form-item>
        <el-form-item label="属性">
          <el-input v-model="shuju.prop"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <div class="block">
            <el-date-picker v-model="shuju.time" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <div class="box">
          <el-button type="primary" @click="upDate()">修改</el-button>
          <el-button type="primary" @click="back()">返回</el-button>
        </div>
      </el-form>
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
      from: {
        name: "",
        pass: "",
        prop: "",
        time: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 6, max: 9, message: "长度在 6 到 9 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 9, message: "长度在 6 到 9 个字符", trigger: "blur" }
        ]
      },
      pass2: "",
      Show: true,
      old: false,
      shuju: {}
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

    gettime(param) {
      const d = new Date(param);
      let y = d.getFullYear();
      let m =
        d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
      let day = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
      return y + m + day;
    },
    upDate() {
      console.log(
        this.$route.params.id,
        "----------",
        this.shuju.prop,
        this.shuju.time
      );
      var id = this.$route.params.id;
      this.$http({
        url: API.updateManage,
        params: {
          id: id,
          prop: this.shuju.prop,
          time: this.shuju.time
        }
      })
        .then(d => {
          this.$router.push("/home/manage");
          this.open2("更新成功");
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 注册确定按钮
    register(n) {
      this.$refs[n].validate(valid => {

        if (valid) {
          if (this.from.pass == this.pass2) {
            var data = this.from;
            this.$http({
              url: API.addManager,
              params: data
            }).then(d => {
              console.log(d);
              if (!d.data.isok) {
                this.open3(d.data.info);
              } else {
                this.$router.push("/home/manage");
                this.open2("添加成功");
              }
            });
          } else {
            this.open1("密码和确认密码不一致");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    back() {
      this.$router.go(-1);
    }
  },
  mounted() {
    if (this.$route.params.id != 0) {
      // var id=this.$route.params.id
      //   this.$http({
      //     url:API.updateMagage,
      //     params:id
      //   }).then(d=>{
      //     console.log(d)
      //   })
      this.Show = false;
      this.old = true;
      console.log("1111111");
      this.$http({
        url: API.findManage,
        params: {
          id: this.$route.params.id
        }
      }).then(d => {
        this.shuju = d.data.data[0];
      });
    } else {
      this.Show = true;
      this.old = false;
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/styl/index.styl';

.el-input {
  width: 800px !important;
}

.box {
  text-align: center;
  width: 950px;
}
</style>