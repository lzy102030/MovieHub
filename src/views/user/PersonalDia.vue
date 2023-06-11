<template>
  <div>
    <el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
      <el-form :model="form" :rules="rules" ref="form" label-width="150px">
        <div class="updateinfo">
          <div class="left">
            <el-form-item label="头像" prop="avatar" @click.stop="uploadHeadImg">
              <img style="width:150px;height:110px" :src="form.file"/>
              <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
            </el-form-item>
            <el-form-item label="用户昵称" prop="id">
              <el-input v-model="form.user_name"></el-input>
            </el-form-item>
            <el-form-item label="个性签名" prop="design">
              <el-input v-model="form.style_text"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submit">提 交</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import Cookies from "js-cookie";

export default {
  name: "PersonalDia",
  data() {
    return {
      dialogVisible: false,
      form: {
        file: "",
        user_name: "",
        style_text: "",
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
    uploadHeadImg: function () {
      this.$el.querySelector('.hiddenInput').click()
    },
    // 将头像显示
    handleFile: function (e) {
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      var reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        this.form.file = res.result
      }
      reader.readAsDataURL(file)
    },
    submit() {
      request.put('/user/change/info',
          this.form,
          {
            headers: {'token': this.token.token}
          }
      ).then(res => {
        console.log(res)
      }).catch((err) => {
        console.log(err);
      })
    },
    handleClose() {
      this.dialogVisible = false;
      this.$emit("flesh");
    },
  },
};
</script>

<style scoped>
.updateinfo {
  height: 350px;
  overflow: auto;
}

.left {
  width: 330px;
  float: left;
}

.hiddenInput {
}

</style>
