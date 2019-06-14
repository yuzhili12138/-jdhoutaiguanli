<template>
  <div class="wrapper">
    <div class="box1">
      <el-form label-width="80px" :rules="rules" :model="user" ref="user">
        <el-form-item label="ip" prop="ip">
          <el-input v-model="user.ip"></el-input>
        </el-form-item>

        <el-form-item label="机房" prop="pass">
          <el-input v-model="user.door"></el-input>
        </el-form-item>

        <el-form-item label="编号" v-if="n">
          <el-input v-model="user.num"></el-input>
        </el-form-item>

        <el-form-item label="宽带">
          <el-input type="email" v-model="user.width"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <template>
            <el-radio v-model="user.status" label="1">空闲</el-radio>
            <el-radio v-model="user.status" label="0">已出售</el-radio>
          </template>
        </el-form-item>
        <div class="box" v-if="n">
          <el-button type="primary" @click="register('user')">添加设备</el-button>
          <el-button type="primary" @click="back()">返回</el-button>
        </div>
        <div class="box2" v-if="n2">
          <el-button type="primary" @click="upDate()">修改设备</el-button>
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
    var reIP = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("IP不能为空"));
      } else if (
        !/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(
          value
        )
      ) {
        return callback(new Error("请输入正确IP"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        ip: [{ validator: reIP, trigger: "blur" }]
      },

      user: {},
      n: Boolean,
      n2: Boolean
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

    register(user) {
      // console.log(this.user)

      this.$refs[user].validate(valid => {
        if (valid) {
          this.user.status=this.user.status==0?'已出售':'空闲'
      let data = this.user;
      this.$http({
        url: API.addDevice,
        params: data
      }).then(d => {
          console.log(d)
        if (!d.data.isok) {
          this.open3(d.data.info);
        } else {
          this.$router.push("/home/device");
          this.open2("添加成功");
        }
      });
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
      var id = this.$route.params.id;
      this.user.status = this.user.status == 0 ? "已出售" : "空闲";
      this.$http({
        url: API.updateDevice,
        params: {
          id: id,
          ip: this.user.ip,
          door: this.user.door,
          width: this.user.width,
          status: this.user.status
        }
      })
        .then(d => {
          this.$router.push("/home/device");
          this.open2("更新成功");
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    var a = JSON.parse(localStorage.getItem("add"));
    if (a.type == 2) {
      this.n = false;
    }

    if (this.$route.params.id != 0) {
      this.n = false;
      this.n2 = true;
      this.$http({
        url: API.findDevice,
        params: {
          id: this.$route.params.id
        }
      }).then(d => {
        console.log(d);
        d.data.data[0].status = d.data.data[0].status == "空闲" ? "1" : "0";
        this.user = d.data.data[0];
      });
    } else {
      this.n = true;
      this.n2 = false;
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/styl/index.styl';

.box {
  width: 950px;
  text-align: center;
}

.el-input {
  width: 800px;
}

.box1 {
  text-align: left !important;
}

.box2 {
  width: 950px;
  text-align: center;
}
</style>