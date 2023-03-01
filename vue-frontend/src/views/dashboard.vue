<template>
  <div>
    <router-link to="/login">登录</router-link>
    <br />
    <router-link to="/register">注册</router-link>
    <h1>{{ message == undefined ? "无法显示，请先登录" : message }}</h1>
    <button @click="logout()">登出</button>
  </div>
</template>

<script>
import { removeToken } from "@/utils/auth";

export default {
  name: "Dashboard",
  data() {
    return {
      message: undefined,
    };
  },
  mounted() {
    console.log(this.$store.state.token);
    if (this.$store.state.token != undefined) {
      this.$axios
        .get("/dashboard")
        .then((res) => {
          this.message = res.message;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch("setToken", "")
        .then(() => {
          removeToken();
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
