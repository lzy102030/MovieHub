<template>
  <div class="person" style="background-color: aliceblue;">
    <div class="PersonTop">
      <div class="PersonTop_img">
        <img v-bind:src=this.graph class="image">
      </div>
      <div class="PersonTop_text">
        <div class="user_text">
          <div class="user_name">
            <span>昵称：{{ this.user_name }}</span>
          </div>
          <div class="user-v">
            <span class="user-v-font">邮箱：{{ this.mail }}</span>
          </div>
          <div class="user_qianming">
            <span>个性签名： {{ this.sign }}</span>
          </div>
          <div class="user_anniu">
            <el-button class="el-icon-edit" type="primary" size="medium" @click="edit" plain>编辑</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="person_body">
      <div class="person_body_left">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span class="person_body_list" style="border-bottom: none">个人中心</span>
          </div>
          <el-menu router active-text-color="#00c3ff" class="el-menu-vertical-demo">
            <el-menu-item index="/personal/info">
              <i class="el-icon-user"></i>
              <span slot="title">个人简介</span>
            </el-menu-item>
            <el-menu-item index="/personal/mycollect">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">个人收藏</span>
            </el-menu-item>
            <el-menu-item index="/personal/myHistory">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">浏览记录</span>
            </el-menu-item>
            <el-menu-item index="/personal/modify-password">
              <i class="el-icon-document"></i>
              <span slot="title">修改密码</span>
            </el-menu-item>
          </el-menu>
        </el-card>
      </div>
      <div class="person_body_right">
        <router-view></router-view>
      </div>
    </div>
    <personal-dia ref="dia"/>
  </div>
</template>

<script>
import PersonalDia from "./PersonalDia.vue";
import request from "@/utils/request";
import Cookies from 'js-cookie'
import axios from "axios";

export default {
  components: {PersonalDia},
  name: "Personal",
  inject: ["reload"],
  data() {
    return {
      user_name: "",
      mail: '',
      sign: '',
      graph: require("@/assets/background.jpg"),
      token: JSON.parse(Cookies.get('token'))
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    edit() {
      this.$refs.dia.open();
    },
    load() {
      request.post('/user/info',
          {},
          {
            headers:{'token':this.token.token}
          }
      ).then(res => {
        console.log(res)
        //this.graph = res.data.graph;
        this.user_name = res.data.user_name;
        this.mail = res.data.mail_or_id;
        window.localStorage.setItem('email', this.email)
        this.sign = res.data.style_text;
      }).catch((err)=>{
        console.log(err);
      })
    }
  }

}
</script>

<style scoped>
.me-video-player {
  background-color: transparent;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  position: fixed;
  left: 0;
  z-index: 0;
  top: 0;
}

.person {
  /* 100%的窗口高度 */
  height: 100vh;
  /* 弹性布局 水平 + 垂直居中 */
  display: flex;
  /* 渐变背景 */
  /* background-image: url("../../assets/back.jpg"); */
  background: url("@/assets/background.jpg");
}

.PersonTop {
  width: 1000px;
  height: 140px;
  padding-top: 10px;
  background-color: white;
  margin-top: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  border-radius: 5px;
  opacity: 0.8;
}

.PersonTop_img {
  width: 150px;
  height: 120px;
  background-color: #8c939d;
  margin-right: 24px;
  margin-left: 20px;
  overflow: hidden;
  border-radius: 20px;
}

.PersonTop_img img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.PersonTop_text {
  height: 120px;
  width: 880px;
  display: flex;
}

.user_text {
  width: 60%;
  height: 100%;
  line-height: 30px;
}

.user_name {
  font-weight: bold;
}

.user-v {
  margin-bottom: -5px;
}

.user-v-img {
  width: 15px;
  height: 15px;
}

.user-v-font {
  font-size: 15px;
  color: #00c3ff;
}

.user_qianming {
  font-size: 14px;
  color: #999;
}

.user_num {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
}

.user_num > div {
  text-align: center;
  border-right: 1px dotted #999;
  box-sizing: border-box;
  width: 80px;
  height: 40px;
  line-height: 20px;
}

.num_text {
  color: #999;
}

.num_number {
  font-size: 20px;
  color: #333;
}

.el-menu-item > span {
  font-size: 16px;
  color: #999;
}

/*下面部分样式*/
.person_body {
  width: 1000px;
  margin-top: 200px;
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  opacity: 0.8
}

.person_body_left {
  width: 27%;
  border-radius: 5px;
  margin-right: 3%;
  text-align: center;
}

.person_body_list {
  width: 100%;
  height: 50px;
  margin-top: 25px;
  font-size: 22px;
  border-radius: 5px;
  border-bottom: 1px solid #f0f0f0;
  background-image: -webkit-linear-gradient(left,
  rgb(42, 134, 141),
  #e9e625dc 20%,
  #3498db 40%,
  #e74c3c 60%,
  #09ff009a 80%,
  rgba(82, 196, 204, 0.281) 100%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s linear infinite;
}

.el-menu-item {
  margin-top: 22px;
}

.person_body_right {
  width: 70%;
  /* height: 500px; */
  border-radius: 5px;
  background-color: white;
}

.box-card {
  height: 500px;
}

/*ui样式*/
.el-button {
  width: 84px;
}

</style>
