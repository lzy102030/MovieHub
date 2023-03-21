<template>
  <div style="height: 100vh; overflow: hidden">
    <div
        style="width: 500px; height: 400px; background-color: white; border-radius: 10px; margin: 150px auto; padding: 50px">
      <div style="margin: 30px; text-align: center; font-size: 30px; font-weight: bold">登 录</div>
      <el-form :model="admin" ref="loginForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入账号" prefix-icon="el-icon-user" size="medium" v-model="admin.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" size="medium" v-model="admin.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" size="medium" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login.vue",
  data() {
    return {
      admin: {}
    }
  },
  methods: {
    login() {
      // request.post("", this.admin).then(res => {
      //   if (res.code === "200") {
      //     this.$notify.success("登陆成功")
      //     this.$router.push('/')
      //   } else {
      //     this.$notify.error(res.msg)
      //   }
      // })
      this.$router.push('/')
    }
  }
}
</script>
