<template>
  <div>
    <el-card>
      <el-descriptions class="margin-top" title="简介" :column="2" border>
        <template slot="extra">
          <el-button type="primary" size="small">操作</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-picture-outline"></i>
            头像
          </template>
          <img class="img" :src="avatar" alt=""/>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            邮箱
          </template>
          {{ this.mail}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            昵称
          </template>
          {{ this.user_name }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-magic-stick"></i>
            个性签名
          </template>
          {{ this.sign }}
        </el-descriptions-item>

      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
// import { userInfo } from "@/api/user.js";
import request from "@/utils/request";
import Cookies from "js-cookie";

export default {
  name: "Info",
  data() {
    return {
      avatar: require("@/assets/background.jpg"),
      mail: '',
      user_name: '',
      sign: '',
      token: JSON.parse(Cookies.get('token'))
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      request.post('/user/info',
          {},
          {
            headers: {'token': this.token.token}
          }
      ).then(res => {
        console.log(res)
        //this.avatar = res.data.graph;
        this.user_name = res.data.user_name;
        this.mail = res.data.mail_or_id;
        this.sign = res.data.style_text;
      }).catch((err) => {
        console.log(err);
      })
    },
  },
};
</script>

<style scoped>
.img {
  width: 80px;
  height: 80px;
}
</style>
