<template>
  <div class="wrapper">
    <!--card-->
    <div style="display: flex">
      <el-row>
        <el-col :span="4" v-for="item in result" :key="item.id" style="margin-left: 80px; margin-top: 20px;">
          <el-card :body-style="{ padding: '0px' }">
            <img v-bind:src=item.posterPath class="image" v-on:click="openDetail(item)">
            <div style="padding: 14px;height: 8px">
              <h3 class="cTitle">{{ item.originalTitle }}</h3>
              <div class="bottom clearfix">
                <div class="rating">评分： {{ item.voteAverage }}</div>
                <div style="height:5px"></div>
                <el-button type="text" class="button" v-on:click="add(item)">收藏</el-button>
                <time class="time">{{ item.releaseDate }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import request from "@/utils/request";

export default {
  name: "SearchResult",
  data() {
    return {
      result: [],
      key: '',
      token: Cookies.get('token') ? JSON.parse(Cookies.get('token')) : {}
    };
  },
  created() {
    this.load();
  },
  methods:{
    load() {
      this.key = this.$route.query.key;
      request.get('/search', {
        params: {query: this.key}
      }).then(res => {
        this.result = res.data;
        console.log(res)
      }).catch((err) => {
        console.log(err);
      })
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
</style>