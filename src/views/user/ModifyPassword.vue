<template>
  <div>
    <el-form :model="form" ref="form">
      <div class="password-info">
        <div class="password-form">
          <el-form-item label="原始密码" prop="originPassword">
            <el-input type="password" v-model="form.originPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认原始密码" prop="newPassword">
            <el-input type="password" v-model="form.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="RenewPassword">
            <el-input type="password" v-model="form.renewPassword"></el-input>
          </el-form-item>
        </div>
        <div>
          <span slot="footer" class="footer">
            <el-button type="primary" @click="submit">提 交</el-button>
          </span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request";
import Cookies from "js-cookie";

export default {
  name: "ModifyPassword",
  data() {
    return {
      dialogVisible: false,
      form: {
        originPassword: "",
        newPassword: "",
        renewPassword: ""
      },
      token: JSON.parse(Cookies.get('token'))
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    load() {

    },
    alert() {
      this.$message({
        message: this.errorMessage,
        type: 'warning'
      });
    },
    submit() {
      let reqData = {
        oldPasswordOne: this.form.originPassword,
        oldPasswordTwo: this.form.newPassword,
        newPassword: this.form.renewPassword
      }
      console.log(reqData);
      request.post('/user/reset-password',
          reqData,
          {headers: {'token': this.token.token}}
      ).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.errorMessage = '修改密码成功';
          this.alert();
        } else {
          this.errorMessage = res.msg;
          this.alert();
        }
      }).catch((err) => {
        console.log(err);
      })
    },
  },
};
</script>

<style>
.password-info {
  height: 400px;
  overflow: auto;
  margin-left: 150px;
  margin-top: 50px;
}

.password-form {
  /* width: 330px; */
  width: 400px;
}

.footer {
  margin-left: 160px;
}
</style>