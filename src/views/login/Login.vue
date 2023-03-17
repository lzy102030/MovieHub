<template>
  <div style="margin: 200px auto; background-color: #fff; width: 350px; height: 350px; padding: 20px; border-radius: 10px">
    <div style="margin: 20px 0;text-align: center;font-size: 24px"><b>登 录</b></div>
    <el-form :model="admin" ref="loginForm">
      <el-form-item prop="username">
        <el-input placeholder="请输入账号" size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="admin.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-aim" show-password v-model="admin.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" size="medium" type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
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
    }
  }
}
</script>
