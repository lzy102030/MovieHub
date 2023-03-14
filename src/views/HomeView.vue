<template>
  <div>
    <!--搜索框-->
    <div style="margin-bottom: 20px">
      <el-input style="width: 240px" placeholder="请输入搜索内容"></el-input>
      <el-button type="primary" style="margin-left: 10px"><i class="el-icon-search"></i>搜索</el-button>
    </div>

    <!--分页-->
    <div style="margin-top: 20px">
      <el-pagination
          background
          :page-size="5"
          layout="prev, pager, next"
          :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>
