<template>
  <div class="wrapper">
    <!--头部区域-->
    <div id="building" style="height: 70px; line-height: 70px; margin-bottom: 5px; ">
      <img src="@/assets/logo.png" alt="" style="width: 60px; height: 60px; position: relative; top: 4px; left: 5px;">
      <span style="margin-left: 12px; font-size: 60px; color: white; font-family: 'Bell MT'">MovieHub</span>
      <!--搜索框-->
      <div class="el-input_box">
        <el-input v-model="text"  class="el-input__inner" placeholder="Search Here" size="large"></el-input>
        <el-button class="el-button_wrapper" type="primary" size="large" @click="search">
          <i class="el-icon-search"></i>Search
        </el-button>
      </div>
      <!--头像-->
      <div style="margin-left: 500px;margin-top: 25px" v-on:click="enterPersonPage">
        <el-avatar shape="square" icon="@/assets/background.jpg"></el-avatar>
      </div>

    </div>

    <!--侧边栏和主体-->
    <div style="display: flex" id="building">
      <!--侧边栏导航-->
      <div
          style="width: 200px; min-height: calc(100vh - 75px); overflow: hidden; margin-right: 2px;overflow-y: auto">
        <el-menu :default-active="$route.path" :default-openeds="['/']" router class="el-menu-demo">
          <el-menu-item index="/home">
            <i class="el-icon-s-help"></i>
            <span class="category">Home Page</span>
          </el-menu-item>
          <el-menu-item index="/Adventure" :route="{path:'/category',query:{category:'Adventure'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Adventure</span>
          </el-menu-item>
          <el-menu-item index="/Fantasy" :route="{path:'/category',query:{category:'Fantasy'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Fantasy</span>
          </el-menu-item>
          <el-menu-item index="/Animation" :route="{path:'/category',query:{category:'Animation'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Animation</span>
          </el-menu-item>
          <el-menu-item index="/Drama" :route="{path:'/category',query:{category:'Drama'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Drama</span>
          </el-menu-item>
          <el-menu-item index="/Horror" :route="{path:'/category',query:{category:'Horror'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Horror</span>
          </el-menu-item>
          <el-menu-item index="/Action" :route="{path:'/category',query:{category:'Action'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Action</span>
          </el-menu-item>
          <el-menu-item index="/Comedy" :route="{path:'/category',query:{category:'Comedy'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Comedy</span>
          </el-menu-item>
          <el-menu-item index="/History" :route="{path:'/category',query:{category:'History'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">History</span>
          </el-menu-item>
          <el-menu-item index="/Western" :route="{path:'/category',query:{category:'Western'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Western</span>
          </el-menu-item>
          <el-menu-item index="/Thriller" :route="{path:'/category',query:{category:'Thriller'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Thriller</span>
          </el-menu-item>
          <el-menu-item index="/Crime" :route="{path:'/category',query:{category:'Crime'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Crime</span>
          </el-menu-item>
          <el-menu-item index="/Documentary" :route="{path:'/category',query:{category:'Documentary'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Documentary</span>
          </el-menu-item>
          <el-menu-item index="/Science Fiction" :route="{path:'/category',query:{category:'Science Fiction'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Science Fiction</span>
          </el-menu-item>
          <el-menu-item index="/Mystery" :route="{path:'/category',query:{category:'Mystery'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Mystery</span>
          </el-menu-item>
          <el-menu-item index="/Music" :route="{path:'/category',query:{category:'Music'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Music</span>
          </el-menu-item>
          <el-menu-item index="/Romance" :route="{path:'/category',query:{category:'Romance'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Romance</span>
          </el-menu-item>
          <el-menu-item index="/Family" :route="{path:'/category',query:{category:'Family'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Family</span>
          </el-menu-item>
          <el-menu-item index="/War" :route="{path:'/category',query:{category:'War'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">War</span>
          </el-menu-item>
          <el-menu-item index="/Foreign" :route="{path:'/category',query:{category:'Foreign'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">Foreign</span>
          </el-menu-item>
          <el-menu-item index="/TV Movie" :route="{path:'/category',query:{category:'TV Movie'}}">
            <i class="el-icon-s-help"></i>
            <span class="category">TV Movie</span>
          </el-menu-item>
        </el-menu>
      </div>

      <!--主体-->
      <div style="flex: 1; padding: 10px; overflow-y: auto">
        <router-view/>
      </div>
    </div>

  </div>
</template>

<script>
import Cookies from 'js-cookie'
import request from "@/utils/request";

export default {
  name: "Layout.vue",
  data(){
    return {
      token:Cookies.get('token')?JSON.parse(Cookies.get('token')):'',
      text:''
    }
  },
  methods:{
    enterPersonPage(){
      //先验证是否登录。登陆后才能进入个人页
      if(this.token!==''){
        this.$router.push('/personal');
      }else{
        this.$router.push('/login');
      }
    },
    search(){
      // 跳转详情页
      let pathInfo = this.$router.resolve({
        path:'/searchResult',
        query:{
          key:this.text
        }
      })
      window.open(pathInfo.href, '_blank');
    }
  }
}
</script>

<style scoped>
.wrapper {
  /*背景图*/
  background: url("@/assets/background.jpg");
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

#building {
  /*设置透明度，0为完全透明，1为不透明*/
  opacity: 0.75;
  display: flex;
}

.category {
  font-size: 25px;
  font-family: 华文中宋;
}

.el-menu-demo {
  background-color: aqua;
  opacity: 0.8;
}

.el-input_box{

  height: 40px;
  margin-left: 220px;
  margin-top: 25px;
  border-radius: 95px;
  background: rgb(0 234 245 / 48%);
  display: flex;
}

/deep/.el-input__inner{
  width: 240px;
  background-color: transparent;/*覆盖原背景颜色，设置成透明 */
  border-radius: 95px;
  border: 0;
  box-shadow: 0 0 0 0px;
}
.el-button_wrapper{
  background: rgb(0 234 245 / 48%);
  border-radius: 95px;
  border: 0;
  box-shadow: 0 0 0 0px;
}
</style>