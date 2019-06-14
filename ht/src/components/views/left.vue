<template>
  <div class="wrapper">
    <div class="n1">
      <router-link to="/home/manage" v-if="show" active-class="select">管理员管理</router-link>
      <router-link to="/home/user" active-class="select" v-if="show2">用户管理</router-link>
      <router-link to="/home/news" active-class="select">通知</router-link>
      <router-link to="/home/device" active-class="select">设备管理</router-link>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  data() {
    return {
      tabPosition: "left",
      show: Boolean,
      show2: Boolean,
      a: {}
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
    }
  },
  mounted() {
    var a = JSON.parse(localStorage.getItem("add"));
    if (!a) {
      this.$router.push("/");
     this.open2("(づ￣3￣)づ╭❤～,请先登录");
     return
    } else {
      if (a.type == 1) {
        this.show = false;
      } else if (a.type == 2) {
        this.show = false;
        this.show2 = false;
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/styl/index.styl';

.wrapper {
  position: fixed;
  height: 100%;
}

.n1 {
  margin-top: 20px;
}

a {
  font-size: 15px;
  display: block !important;
  text-align: center;
  line-height: 40px;
  color: #333;
  height: 40px;
  width: 200px;
}

a:hover {
  background: white;
}

.select {
  background-color: #b3c0d1;
}
</style>