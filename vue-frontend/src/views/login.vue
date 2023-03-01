<template>
  <div>
    <h1>登录</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
    <router-link to="/register">注册</router-link>
  </div>
</template>

<script>
import { setToken } from "@/utils/auth";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      this.$axios
        .post("/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          this.$store.dispatch("setToken", res.token).then(() => {
            setToken(res.token);
            this.$router.push("/");
          });
        })
        .catch((err) => {
          alert("登录失败");
          console.log(err);
        });
    },
  },
};
</script>
