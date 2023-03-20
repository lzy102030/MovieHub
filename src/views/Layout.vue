<template>
  <div class="wrapper">
    <!--头部区域-->
    <div id="building" style="height: 70px; line-height: 70px; margin-bottom: 5px; ">
      <img src="@/assets/logo.png" alt="" style="width: 60px; height: 60px; position: relative; top: 4px; left: 5px;">
      <span style="margin-left: 12px; font-size: 60px; color: white; font-family: 'Bell MT'">MovieHub</span>
      <!--搜索框-->
      <div class="el-input_box">
        <el-input class="el-input__inner" placeholder="请输入搜索内容" size="large"></el-input>
        <el-button class="el-button_wrapper" type="primary" size="large">
          <i class="el-icon-search"></i>搜索
        </el-button>
      </div>
    </div>

    <!--侧边栏和主体-->
    <div style="display: flex" id="building">
      <!--侧边栏导航-->
      <div
          style="width: 200px; min-height: calc(100vh - 75px); overflow: hidden; margin-right: 2px;overflow-y: auto">
        <el-menu :default-active="$route.path" :default-openeds="['/']" router class="el-menu-demo">
          <el-menu-item index="/">
            <i class="el-icon-s-help"></i>
            <span style="font-size: 25px; font-family: 华文中宋">精选</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <i class="el-icon-s-help"></i>
            <span style="font-size: 25px; font-family: 华文中宋">大陆</span>
          </el-menu-item>
          <el-menu-item index="/">
            <i class="el-icon-s-help"></i>
            <span style="font-size: 25px; font-family: 华文中宋">欧美</span>
          </el-menu-item>
          <el-menu-item index="/">
            <i class="el-icon-s-help"></i>
            <span style="font-size: 25px; font-family: 华文中宋">日韩</span>
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
export default {
  name: "Layout.vue"
}
</script>

<style scoped>
.wrapper {
  /*背景图*/
  background: url("@/assets/background.jpg");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}

#building {
  /*设置透明度，0为完全透明，1为不透明*/
  opacity: 0.75;
  display: flex;
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