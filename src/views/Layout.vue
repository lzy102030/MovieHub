<template>
  <div>
    <!--头部区域-->
    <div style="height: 60px; line-height: 60px; background-color: white; margin-bottom: 2px">
      <img src="@/assets/logo.png" alt="" style="width: 60px; height: 60px; position: relative; top: 4px; left: 5px">
      <span style="margin-left: 12px; font-size: 40px">MovieHub</span>
    </div>

    <!--侧边栏和主体-->
    <div style="display: flex">
      <!--侧边栏导航-->
      <div style="width: 200px; min-height: calc(100vh - 62px); overflow: hidden; margin-right: 2px;background-color: white">
        <el-menu :default-active="$route.path" :default-openeds="['/']" router class="el-menu-demo" >
          <el-menu-item index="/">
            <i class="el-icon-s-help"></i>
            <span>首页</span>
          </el-menu-item>
          <el-submenu index="/">
            <template slot="title">
              <i class="el-icon-s-fold"></i>
              <span>分类</span>
            </template>
            <el-menu-item index="/about">选项1</el-menu-item>
            <el-menu-item index="/about">选项2</el-menu-item>
            <el-menu-item index="/about">选项3</el-menu-item>
            <el-menu-item index="/about">选项4</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>

      <!--主体-->
      <div style="flex: 1; background-color: white; padding: 10px">
        <router-view />
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

</style>