<template>
  <div class="content_login">
    <div id="app" class="container">
      <img src="@/assets/bg2.jpg" alt="">
      <div class="panel">
        <div class="switch">
          <span :class='{"active": active.login}' @click="go('login')">登录</span>
          <span :class='{"active": active.forget}' @click="go('forget')">/</span>
          <span :class='{"active": active.register}' @click="go('register')">注册</span>
        </div>
        <div class="form" id="fromLogin">
          <!-- 如果按钮选择的是忘记密码就展示这个里面的内容 -->
          <el-form ref="forgetForm" v-if="active.forget">
            <el-form style="display: flex; height: 2rem;">
              <el-form-item prop="username">
                <el-input placeholder="请输入邮箱" size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="forgetForm.mail_or_id"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button  class="send_button" style="height:100%;border-radius: 1rem; margin: 10px 0;" @click="send">发送验证码</el-button>
              </el-form-item>
            </el-form>
            <el-form-item prop="password" class="input">
              <el-input placeholder="请输入验证码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-aim" show-password v-model="forgetForm.password"></el-input>
            </el-form-item>
            <el-form-item prop="password" class="input">
              <el-input placeholder="请输入新密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-aim" show-password v-model="forgetForm.verify_code"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button  @click="submit">确认</el-button>
            </el-form-item>
          </el-form>

          <!-- 如果按钮选择的是注册就展示这个里面的内容 -->
          <el-form ref="registerForm" v-if="active.register">
            <el-form-item prop="username" class="input">
              <el-input placeholder="请输入用户名" size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="registerForm.user_name"></el-input>
            </el-form-item>
            <el-form-item prop="password" class="input">
              <el-input placeholder="请输入密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-aim" show-password v-model="registerForm.password"></el-input>
            </el-form-item>
            <el-form style="display: flex; height: 2rem;">
              <el-form-item prop="username">
                <el-input placeholder="请输入邮箱" size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="registerForm.mail_or_id"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button  class="send_button" style="height:100%;border-radius: 1rem; margin: 10px 0;" @click="send">发送验证码</el-button>
              </el-form-item>
            </el-form>
            <el-form-item prop="password" class="input">
              <el-input placeholder="请输入验证码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-aim" show-password v-model="registerForm.verify_code"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button  @click="submit">注册</el-button>
            </el-form-item>
          </el-form>

          <!-- 如果按钮选择的是登录就展示这个里面的内容 -->
          <el-form ref="loginForm" v-if="active.login">
            <el-form-item prop="username" class="input">
              <el-input placeholder="请输入账号/邮箱" size="15px" style="margin: 15px 0" prefix-icon="el-icon-user" v-model="loginForm.mail_or_id" @blur.native.capture="sendMail"></el-input>
            </el-form-item>
            <el-form-item prop="password" class="input">
              <el-input placeholder="请输入密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-aim" show-password v-model="loginForm.cipherText"></el-input>
              <!-- Add this button below the password input field -->
              <span class="toggle-password" @click="togglePasswordVisibility">
                <i :class="showPassword ? 'el-icon-eye' : 'el-icon-eye-off'"></i>
              </span>
            </el-form-item>
            <span class='{"active":active === "forget"}' @click="go('forget')">忘记密码</span>
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
import request from "@/utils/request";
import Cookies from 'js-cookie'
import sha256 from 'js-sha256'

export default {
  name: "Login.vue",
  data() {
    return {
      active: {
        login: true,
        register: false,
        forget: false
      },
      showPassword: false, // Add this line
      errorMessage:'',
      successMessage:'',
      loginForm :{
        mail_or_id : '',
        cipherText : ''
      },
      registerForm:{
        user_name : '',
        mail_or_id : '',
        password : '',
        verify_code : ''
      },
      forgetForm:{
        mail_or_id : '',
        password : '',
        verify_code : ''
      },
      addition:''
    }
  },
  methods: {
    //密码是否可视
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    //登录注册之间的跳转
    go(type) {
      this.active = {
        login: type === 'login',
        register: type === 'register',
        forget: type === 'forget'
      };
    },
    //警告提示
    alert(){
      this.$message({
        message:this.errorMessage,
        type: 'warning'
      });
    },
    //成功提示
    node(){
      this.$message({
        message:this.successMessage,
        type: 'success'
      });
    },
    sendMail(){
      //先发送mail，获得addition
      request.post('/user/loginWithPassword',{
          mail_or_id:this.loginForm.mail_or_id
      }).then(res => {
        console.log(res.msg);
        if(res.code===500){
          this.errorMessage='该账号密码错误'
          this.alert();
        }else if(res.code===200){
          //保存addition
          this.addition = res.msg;
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    submit() {
      if (this.active.login) {
        this.loginForm.cipherText = sha256(this.addition+this.loginForm.cipherText)
        request.post('/user/loginWithPassword',this.loginForm).then(res => {
          console.log(res.data);
          if(res.code===500){
            this.errorMessage='该账号密码错误'
            this.alert();
          }else if(res.code===200){
            //保存token
            Cookies.set('token',JSON.stringify(res.data))
            //跳转到主页
            this.$router.push('/home');
          }
        }).catch((err)=>{
          console.log(err);
        })
      } else if (this.active.register) {
        request.post('/user/register',this.registerForm).then(res => {
          console.log(res.data);
          if(res.code===200){
            this.successMessage='成功注册';
            this.node();
            this.go('login');
          }else if(this.registerForm.user_name.length<5){
            this.errorMessage='用户名不得小于5位'
            this.alert();
          }else if(this.registerForm.password.length<6){
            this.errorMessage='密码不得小于6位';
            this.alert();
          }else if(res.code===500){
            this.errorMessage=res.data.msg;
            this.alert();
          }
        }).catch((err)=>{
          console.log(err);
        })
      } else if (this.active.forget) {
        request.post('/user/forgetPassword',this.forgetForm).then(res => {
          console.log(res.data);

        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    send(){
      console.log(this.registerForm.mail_or_id);
      const data = JSON.stringify({email: this.registerForm.mail_or_id });
      request.post('/user/sendVerifyCode',data).then(res => {
        console.log(res.data);
        if(res.data.code===500){
          this.errorMessage='请输入正确的邮箱'
          this.alert();
        }else if(res.data.code===200){
          this.successMessage="验证码成功发送"
          this.node();
        }
      }).catch((err)=>{
        console.log(err);
      })
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

.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}


</style>
