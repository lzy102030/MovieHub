<template>
  <div>
    <!--走马灯-->
    <div>
        <el-carousel :interval="4000" type="card" height="250px">
          <el-carousel-item v-for="item in imgList" :key="item.id" @change="carouselChange">
            <el-image style="width: 100%; height: 100%" v-bind:src= item.posterPath v-on:click="openDetail(item)"></el-image>
          </el-carousel-item>
        </el-carousel>
    </div>
    <el-divider content-position="left">
      <div class="title">Popular Movies</div>
    </el-divider>
    <!--card-->
    <div style="display: flex">
      <el-row >
        <el-col :span="4" v-for="item in popular" :key="item.id" style="margin-left: 80px; margin-top: 20px;">
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
    <div style="height:20px"></div>
    <el-divider content-position="left">
      <div class="title">Box office sales</div>
    </el-divider>
    <!--card-->
    <div style="display: flex">
      <el-row >
        <el-col :span="4" v-for="item in highest" :key="item.id" style="margin-left: 80px; margin-top: 20px;">
          <el-card :body-style="{ padding: '0px' }">
            <img v-bind:src= item.posterPath class="image" v-on:click="openDetail(item)">
            <div style="padding: 14px;height: 8px">
              <h3 class="cTitle">{{item.originalTitle}}</h3>
              <div class="bottom clearfix">
                <div class="rating">评分： {{item.voteAverage}}</div>
                <div style="height:5px"></div>
                <el-button type="text" class="button" v-on:click="add">收藏</el-button>
                <time class="time">{{ item.releaseDate }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="height:20px"></div>
    <el-divider content-position="left">
      <div class="title">Today of the Year</div>
    </el-divider>
    <!--card-->
    <div style="display: flex">
      <el-row >
        <el-col :span="4" v-for="item in historyDay" :key="item.id" style="margin-left: 80px; margin-top: 20px;">
          <el-card :body-style="{ padding: '0px' }">
            <img v-bind:src= item.posterPath class="image" v-on:click="openDetail(item)">
            <div style="padding: 14px;height: 8px">
              <h3 class="cTitle">{{item.originalTitle}}</h3>
              <div class="bottom clearfix">
                <div class="rating">评分： {{item.voteAverage}}</div>
                <div style="height:5px"></div>
                <el-button type="text" class="button" v-on:click="add">收藏</el-button>
                <time class="time">{{ item.releaseDate }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="height:20px"></div>
    <el-divider content-position="left">
      <div class="title">Recommended</div>
    </el-divider>
    <!--card-->
    <div style="display: flex">
      <el-row>
        <el-col :span="4" v-for="item in recommend" :key="item.id" style="margin-left: 80px; margin-top: 20px;">
          <el-card :body-style="{ padding: '0px' }">
            <img v-bind:src= item.posterPath class="image" v-on:click="openDetail(item)">
            <div style="padding: 14px;height: 8px">
              <h3 class="cTitle">{{item.originalTitle}}</h3>
              <div class="bottom clearfix">
                <div class="rating">评分： {{item.voteAverage}}</div>
                <div style="height:5px"></div>
                <el-button type="text" class="button" v-on:click="add">收藏</el-button>
                <time class="time">{{ item.releaseDate }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style>
.rating {
  font-size: 16px;
  font-weight: bold;
  color: #f5ac45;
}

.cTitle {
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 100%;
  margin: 4px 0; /* 调整上下边距 */
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.title {
  font-size: 40px;
  font-family: 华文中宋;
  color: #070707;
  /*background-color: aqua;*/
}

</style>

<script>
import request from "@/utils/request";
import Cookies from 'js-cookie'

export default {
  name: 'HomeView',
  data() {
    return {
      imgList: [],
      recommend:[],
      highest:[],
      popular:[],
      historyDay:[],
      tag:true,
      pageNum:0,
      token:Cookies.get('token')?JSON.parse(Cookies.get('token')):{}
    };
  },
  mounted(){
    window.addEventListener("scroll",this.scrollFn)
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      console.log(this.token)
      request.get('/choice', {
        params: { page: this.pageNum },
        headers: { 'token': this.token.token}
      }).then(res => {
        console.log(res)
        this.recommend = res.data.Recommend;
        this.popular = res.data.Popular;
        this.highest = res.data.HighestBox;
        this.historyDay = res.data.Today;
        this.loadPoster()
      }).catch((err)=>{
            console.log(err);
      })
      this.pageNum++;
    },
    loadPoster(){
      let i =0
      for(;i < 5;i++){
        this.imgList.push(this.recommend.at(i))
      }
    },
    carouselChange(now, prev){
      console.log("图片索引切换: " + prev + "--->" + now);
    },
    openDetail(item){
      //添加历史记录
      if(this.token!==''){
        request.post('/user/history/'+item.tmdbId,
            {},
            {
              headers:{'token':this.token.token}
            }
        ).then(res => {
          console.log(res.data)
          console.log(item.tmdbId)
        }).catch((err)=>{
          console.log(err);
        })
      }
      // 跳转详情页
      let pathInfo = this.$router.resolve({
        path:'/movie',
        query:{
          tmdbId:item.tmdbId
        }
      })
      window.open(pathInfo.href, '_blank');
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
    },
    async scrollFn() {
      //可视区域
      let clientHeight = document.documentElement.clientHeight
      // 滚动文档高度
      let scrollHeight = document.body.scrollHeight
      // 已滚动的高度
      let scrollTop = parseInt(document.documentElement.scrollTop)
//占位
      if (scrollTop + clientHeight === scrollHeight) {
        if(!this.tag) return
        request.get('/choice', {
          params: { page: this.pageNum },
          headers: { 'token': this.token.token }
        }).then(res => {
          this.recommend = this.recommend.concat(res.data)
          if(res.data.length < 20){
            this.tag = false
          }
        }).catch((err)=>{
          console.log(err);
        })
        this.pageNum++;
      }
    },
  }
}
</script>
