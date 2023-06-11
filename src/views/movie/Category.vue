<template>
  <div class="category">
    <!--card-->
    <div style="display: flex">
      <el-row>
        <el-col :span="4" v-for="item in movie" :key="item.id" style="margin-left: 80px; margin-top: 20px;">
          <el-card :body-style="{ padding: '0px' }">
            <img v-bind:src= item.posterPath class="image" v-on:click="openDetail(item)">
            <div style="padding: 14px;height: 8px">
              <h3 class="cTitle">{{item.originalTitle}}</h3>
              <div class="bottom clearfix">
                <div class="rating">评分： {{item.voteAverage}}</div>
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
import request from "@/utils/request";

export default {
  name: "AboutView.vue",
  data() {
    return {
      category:'',
      movie:[]
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.category = this.$route.query.category;
      console.log(this.category)
      request.get('/genre/' + this.category).then(res => {
        this.movie = res.data;
        console.log(res)
      }).catch((err)=>{
        console.log(err);
      })
    },
    add(item){
      request.post('/user/collection/'+item.tmdbId,
          {},
          {
            headers:{'token':this.token.token}
          }
      ).then(res => {
        console.log(res)
        console.log(item.tmdbId)
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
}
</script>
