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

    <!--主体-->
    <section>
      <!--电影基本信息及评论-->
      <article>
        <div>
          <span style="font-size: 60px; font-family: 华文中宋">This is the movie name.</span>
        </div>
        <div class="out_div">
          <!--图片-->
          <div class="picture">
            <img :src="this.movie.image" class="image">
          </div>
          <!--基本信息-->
          <div class="info">
            <span style="font-size: 60px">
              电影基本信息
            </span>
          </div>
          <!--评分-->
          <div class="comment">
            <span>评分</span>
          </div>
        </div>

        <!--评论区-->
        <div style="margin-top: 50px">
          <span style="font-size: 60px">评论区评论区评论区评论区评论区评论区123</span>
        </div>
      </article>

      <!--侧边相关推荐-->
      <article style="width: 30%">
        <span>this is 相关推荐</span>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: "Movie.vue",
  data() {
    return {
      movie: {
        image: require("@/assets/background.jpg")
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  background: url("@/assets/background.jpg");
  overflow: hidden;
}

.out_div {
  display: flex;
  flex: 1;
  flex-flow: row;
}

.picture{
  width: 30%;
}

.info{
  width: 40%;
}

.comment{
  width: 30%;
}

section {
  display: flex;
  flex-flow: row;
}

article {
  padding: 10px;
  margin: 10px;
  background: aqua;
}

.image {
  height: 400px;
  width: 250px;
  display: flex;
}

#building {
  /*设置透明度，0为完全透明，1为不透明*/
  opacity: 0.75;
  display: flex;
}

.el-input_box {
  height: 40px;
  margin-left: 220px;
  margin-top: 25px;
  border-radius: 95px;
  background: rgb(0 234 245 / 48%);
  display: flex;
}

/deep/ .el-input__inner {
  width: 240px;
  background-color: transparent; /*覆盖原背景颜色，设置成透明 */
  border-radius: 95px;
  border: 0;
  box-shadow: 0 0 0 0px;
}

.el-button_wrapper {
  background: rgb(0 234 245 / 48%);
  border-radius: 95px;
  border: 0;
  box-shadow: 0 0 0 0px;
}
</style>