<template>
  <div class="content_login">
    <div id="app" class="container">
      <img src="@/assets/bg2.jpg" alt="">
      <div class="panel">
        <div class="switch">
          <span :class='{"active":active === "login1"}' @click="go('login1')">登录</span>
          <span>/</span>
          <span :class='{"active":active === "register"}' @click="go('register')">注册</span>
        </div>
        <div class="form" id="fromLogin">
          <!-- 如果按钮选择的是注册就展示这个里面的内容 -->
          <el-form :model="register"  ref="registerForm" v-if="active === 'register'">
            <el-form-item prop="username" class="input">
              <el-input placeholder="请输入账号" size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="registerForm.Username"></el-input>
            </el-form-item>
            <el-form-item prop="password" class="input">
              <el-input placeholder="请输入密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-aim" show-password v-model="registerForm.Password"></el-input>
            </el-form-item>
            <el-form-item prop="password" class="input">
              <el-input placeholder="再次确认密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-aim" show-password v-model="registerForm.Repeat"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button  @click="submit">注册</el-button>
            </el-form-item>
          </el-form>

          <!-- 如果按钮选择的是登录就展示这个里面的内容 -->
          <el-form :model="login1" ref="loginForm" v-if="active === 'login1'">
            <el-form-item prop="username" class="input">
              <el-input placeholder="请输入账号" size="15px" style="margin: 15px 0" prefix-icon="el-icon-user" v-model="loginForm.Username"></el-input>
            </el-form-item>
            <el-form-item prop="password" class="input">
              <el-input placeholder="请输入密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-aim" show-password v-model="loginForm.Password"></el-input>
            </el-form-item>
            <span class='{"active":active === "register"}' @click="go('register')">忘记密码</span>
            <el-form-item>
              <el-button @click="submit">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login1.vue",
  data() {
    return {
      active : 'login1',
      loginForm :{
        Username : '',
        Password : ''
      },
      registerForm:{
        email : '',
        Username : '',
        Password : '',
        Repeat : ''
      },
    }
  },
  methods: {
    go(type){
      this.active = type;
    },
    submit(){
      if(type === 'login1'){
        console.log('login',this.loginForm)
      }
      if(type === 'register'){
        console.log('register',this.registerForm)
      }
    }
  }
}
</script>

<style>

*{
  margin: 0;
  padding: 0;
}

.content_login{
  /* 100%的窗口高度 */
  height: 100vh;
  /* 弹性布局 水平 + 垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 渐变背景 */
  background: linear-gradient(45deg,rgb(42,191,234),rgb(183,236,247)) fixed;
}

.container{
  /* 相对定位 */
  position: relative;
  width: 70rem;
}

.container img{
  width: 70rem;
}

.panel{
  width: 44%;
  margin: 10rem -2rem 0;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
}

.switch span{
  color: #ccc;
  font-size: 1.4rem;
  /* 鼠标放上变小手 */
  cursor: pointer;
}

.switch span.active{
  color: rgb(97, 220, 241);
}

.form{
  width: 15rem;
  margin: 3rem -10rem 0;
}

.form .input{
  position: relative;
  opacity: 1;
  height: 2rem;
  width: 100%;
  margin: 2rem 0;
  transition: 0.4s;
}

.form input{
  outline: none;
  width: 100%;
  border: none;
  border-bottom: .1rem solid rgb(97, 220, 241);
  position: relative;
  line-height: 35px;
  background-color: transparent;
  z-index: 1;
}

.form span{
  display: block;
  color: rgb(3, 39, 76);
  font-size: 0.8rem;
  cursor: pointer;
}

.form button{
  border: none;
  outline: none;
  margin: 2.5rem 0 0;
  width: 100%;
  height: 3rem;
  border-radius: 3rem;
  background:linear-gradient(45deg, rgb(99, 168, 239), rgb(97, 220, 241)) ;
  box-shadow: 0 0 8px rgb(99, 168, 239);
  cursor: pointer;
  color: white;
}


</style>
