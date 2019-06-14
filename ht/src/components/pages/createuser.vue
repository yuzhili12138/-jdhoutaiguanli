<template>
  <div class="wrapper">
    <div class="box1" v-if="Show">
      <el-form label-width="80px" :rules="rules" :model="user" ref="user">
        <el-form-item label="账号" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input type="password" autocomplete="off" v-model="user.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" autocomplete="off" v-model="pass2"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="tel">
          <el-input v-model="user.tel"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="user.email"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <template>
            <el-radio v-model="user.sex" label="0">男</el-radio>
            <el-radio v-model="user.sex" label="1">女</el-radio>
          </template>
        </el-form-item>

        <el-form-item label="身份证号" prop="idx">
          <el-input v-model="user.idx"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="user.des"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <div class="block">
            <el-date-picker v-model="user.time" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <div class="box">
          <el-button type="primary" @click="register('user')">添加</el-button>
          <el-button type="primary" @click="back()">返回</el-button>
        </div>
      </el-form>
    </div>

    <div class="box2" v-if="old">
      <el-form label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="shuju.name" disabled></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input type="password" autocomplete="off" v-model="shuju.pass" disabled></el-input>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="shuju.tel"></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input type="email" v-model="shuju.email"></el-input>
        </el-form-item>

        <el-form-item label="性别" disabled>
          <template>
            <el-radio v-model="shuju.sex" label="1" disabled>男</el-radio>
            <el-radio v-model="shuju.sex" label="2" disabled>女</el-radio>
          </template>
        </el-form-item>

        <el-form-item label="身份证号">
          <el-input v-model="shuju.idx" disabled></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="shuju.des"></el-input>
        </el-form-item>
        <el-form-item label="生日">
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
    // 电话正则
    var reTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话不能为空"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error("请输入1开头的11位正确手机号"));
      } else {
        callback();
      }
    };

    var reEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else if (
        !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
          value
        )
      ) {
        return callback(new Error("请输入正确格式邮箱"));
      } else {
        callback();
      }
    };

    var reIdx = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("身份证号不能为空"));
      } else if (
        !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
          value
        )
      ) {
        return callback(new Error("请输入正确身份证号"));
      } else {
        callback();
      }
    };

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
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 9, message: "长度在 6 到 9 个字符", trigger: "blur" }
        ],
        tel: [{ validator: reTel, trigger: "blur" }],
        email: [{ validator: reEmail, trigger: "blur" }],
        idx: [{ validator: reIdx, trigger: "blur" }]
      },

      pass2: "",
      Show: true,
      old: false,
      shuju: {}
    };
  },
  watch: {
    name() {}
  },
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
    register(user) {
      this.$refs[user].validate(valid => {
        if (valid) {
          if (this.pass2 == this.user.pass) {
            this.user.sex = this.user.sex == 0 ? "男" : "女";
            let data = this.user;
            this.$http({
              url: API.addUser,
              params: data
            }).then(d => {
              if (!d.data.isok) {
                this.open3(d.data.info);
              } else {
                this.$router.push("/home/user");
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
        url: API.updateUser,
        params: {
          id: id,
          tel: this.shuju.tel,
          email: this.shuju.email,
          des: this.shuju.des,
          time: this.shuju.time
        }
      })
        .then(d => {
          this.$router.push("/home/user");
          this.open2("更新成功");
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    if (this.$route.params.id != 0) {
      this.Show = false;
      this.old = true;
      console.log();
      this.$http({
        url: API.findUser,
        params: {
          id: this.$route.params.id
        }
      }).then(d => {
        d.data.data[0].sex = d.data.data[0].sex == "女" ? "1" : "0";
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

.box {
  text-align: center;
}

.el-input {
  width: 800px;
}

.box1 {
  text-align: left !important;
}
</style>