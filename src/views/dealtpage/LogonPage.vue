<template>
  <div>
    <div id="login" class="login">
      <div id="login_son">
        <h2>登录</h2>
        <div class="login_input">
          用&nbsp;户 名：<input
            type="text"
            name=""
            id=""
            v-model="username"
            placeholder="请输入您的账号"
          /><br />
          密&nbsp;&nbsp;&nbsp;&nbsp; 码：<input
            type="password"
            name=""
            id=""
            v-model="password"
            placeholder="请输入您的密码"
          /><br />
          <button @click="Logindeng()">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CanvasNest from "canvas-nest.js";
export default {
  data() {
    return {
      username: "张三",
      password: "zhangsan",
      visible: false,
      config: {
        color: "255, 255, 255",
        pointColor: "#FFFFFF", // 节点颜色
        opacity: 1,
        zIndex: 5,
        count: 199,
      },
    };
  },
  methods: {
    Logindeng() {
      if (this.username === "张三" && this.password === "zhangsan") {
        alert("登录成功");
        sessionStorage.setItem("Chao", "Chao");
        this.$router.push("/dealt");
      } else {
        alert("账号或密码错误");
      }
    },
  },
  created() {
    this.$nextTick(() => {
      new CanvasNest(document.getElementById("login"), this.config);
    });
  },
};
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: right;
  align-items: center;
  height: 100%;
  height: 100vh;
  background-image: url("@/assets/redu/bizhi.jpg");
  background-size: cover;
}
#login_son {
  position: absolute;
  top: 50%;
  left: 80%;
  transform: translate(-50%, -50%);
  width: 500px;
  line-height: 60px;
  height: 300px;
  background-color: #ffffff61;
  border-radius: 10px;
  h2 {
    text-align: center;
    font-size: 30px;
  }
  input {
    width: 300px;
    height: 35px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    padding: 0 10px;
  }
  button {
    width: 310px;
    height: 40px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    padding: 0 10px;
    background-color: #fff;
    margin-left: 20%;
  }
}
.login_input {
  width: 400px;
  height: 300px;
  margin: auto;
}
</style>