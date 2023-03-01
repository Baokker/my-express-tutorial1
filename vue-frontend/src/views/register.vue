<template>
  <div>
    <h1>注册</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" />
      </div>
      <div>
        <label>Admin?</label>
        <input type="checkbox" v-model="isAdmin" />
      </div>
      <button type="submit">Submit</button>
    </form>
    <router-link to="/login">登录</router-link>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      isAdmin: false,
    };
  },
  methods: {
    submitForm() {
      this.$axios
        .post("/register", {
          username: this.username,
          password: this.password,
          isAdmin: this.isAdmin,
        })
        .then(() => {
          alert("注册成功！");
        })
        .catch((err) => {
          alert("注册失败！");
          console.log(err);
        });
    },
  },
};
</script>
