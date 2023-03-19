<template>
  <div>
    <!--头部区域-->
    <div style="height: 70px; line-height: 70px;background-color: white; margin-bottom: 5px">
      <img src="@/assets/logo.png" alt="" style="width: 60px; height: 60px; position: relative; top: 4px; left: 5px">
      <span style="margin-left: 12px; font-size: 60px; font-family: 'Bell MT'">MovieHub</span>
      <!--搜索框-->
      <el-input style="left: 20%; bottom: 10px; width: 240px;" placeholder="请输入搜索内容"></el-input>
      <el-button type="primary" style="margin-left: 310px; margin-bottom: 10px"><i class="el-icon-search"></i>搜索</el-button>
    </div>

    <!--侧边栏和主体-->
    <div style="display: flex">
      <!--侧边栏导航-->
      <div
          style="width: 200px; min-height: calc(100vh - 75px); overflow: hidden; margin-right: 2px;background-color: #f6f1f1;overflow-y: auto">
        <el-menu :default-active="$route.path" :default-openeds="['/']" router class="el-menu-demo">
          <el-menu-item index="/">
            <i class="el-icon-s-help"></i>
            <span style="color: black">精选</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <i class="el-icon-s-help"></i>
            <span style="color: black">大陆</span>
          </el-menu-item>
          <el-menu-item index="/">
            <i class="el-icon-s-help"></i>
            <span>欧美</span>
          </el-menu-item>
          <el-menu-item index="/">
            <i class="el-icon-s-help"></i>
            <span>日韩</span>
          </el-menu-item>
        </el-menu>
      </div>

      <!--主体-->
      <div style="flex: 1; background-color: white; padding: 10px; overflow-y: auto">
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

</style>