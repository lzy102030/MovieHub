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
    </div>

    <!--主体-->
    <section>
      <!--电影基本信息及评论-->
      <article>
        <div>
          <span style="font-size: 50px; font-family: 华文中宋; font-weight: bold;">{{ this.movie.originalTitle }}</span>
          <span style="font-size: 35px; font-family: 华文中宋; font-weight: bold; color: #999; margin-left: 0;">
            ({{ new Date(this.movie.releaseDate).getFullYear() }})
          </span>
        </div>
        <div class="out_div">
          <!--图片-->
          <div class="picture">
            <img :src="this.movie.posterPath" class="image">
          </div>
          <!--基本信息-->
          <div class="info">
            <div style="font-size: 20px">
              <div>
                <span class="intro">Director: </span>
                {{this.directorName}}
              </div>
              <div>
                <span class="intro">Editor: </span>
                {{this.editorName}}
              </div>
              <div>
                <span class="intro">Cast: </span>
                <span v-for="(cast, index) in mainCasts">
                  {{ cast.name }}
                  <span v-if="index < mainCasts.length - 1">/</span>
                </span>
              </div>
              <div>
                <span class="intro">Tagline: </span>
                {{ this.movie.tagline }}
              </div>
              <div>
                <span class="intro">Language: </span>
                {{ this.movie.originalLanguage }}
              </div>
              <div>
                <span class="intro">Overview: </span>
                {{ this.movie.overview }}
              </div>
              <div>
                <span class="intro">Genres: </span>
                <span v-for="(genre, index) in genres" :key="genre.id">
                  {{ genre.name }}
                  <span v-if="index < genres.length - 1">/</span>
                </span>
              </div>
              <div>
                <span class="intro">Time: </span>
                {{ this.movie.runtime }} minutes
              </div>
              <div>
                <span class="intro">ReleaseDate: </span>
                {{ this.movie.releaseDate}}
              </div>
              <div>
                <span class="intro">VoteCount: </span>
                {{ this.movie.voteCount }}
              </div>
              <div>
                <span class="intro">Alias: </span>
                {{ this.movie.title }}
              </div>
              <div>
                <span class="intro">VoteAverage: </span>
                <el-rate
                    v-model="displayValue"
                    disabled
                    show-score
                    text-color="#ff9900"
                    :score-template="`${displayValue * 2}`"
                    class="custom-rate">
                </el-rate>
              </div>
              <div style="height: 5px"></div>
              <div>
                <span class="intro">Score: </span>
                <el-rate
                    v-model="value2"
                    :colors="colors"
                    class="custom-rate">
                </el-rate>
                <div style="height: 15px"></div>
                <el-button class="el-button_wrapper" type="primary" size="large" @click="saveScore">
                  Save Score
                </el-button>
              </div>
            </div>
          </div>
          <!--评分-->
        </div>

        <!--评论区-->
        <div style="margin-top: 50px;width: 500px;height: 20px">

        </div>
      </article>

      <!--侧边相关推荐-->
      <article style="width: 30%">
        <span style="font-size: larger">相关推荐</span>
        <el-row>
          <el-col v-for="item in recommend" :key="item.id">
            <img v-bind:src= item.posterPath class="image" v-on:click="openDetail(item)">
            <h3 class="cTitle">{{item.originalTitle}}</h3>
          </el-col>
        </el-row>
      </article>
    </section>
  </div>
</template>

<script>
import request from "@/utils/request";
import Cookies from 'js-cookie'
import axios from "axios";

export default {
  name: "Movie.vue",
  data() {
    return {
      tmdb_id:'',
      movie: {},
      genres:[],
      crews:[],
      casts:[],
      mainCasts:[],
      directorName:'',
      editorName:'',
      value:0,
      value2: null,
      token:Cookies.get('token')?JSON.parse(Cookies.get('token')):'',
      data:{
        tmdb_id:'',
        rate:''
      },
      recommend:[],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true },
    }
  },
  created() {
    this.load()
  },
  computed: {
    displayValue() {
      return this.value / 2;
    }
  },
  methods: {
    load() {
      this.tmdb_id = this.$route.query.tmdbId;
      console.log(this.tmdb_id)
      request.get('/singleMovie/searchMovie',{
        params:{tmdb_id:this.tmdb_id}
      }).then(res => {
        this.movie = res.data.Movie;
        this.genres =res.data.genres;
        this.crews =res.data.crews;
        this.casts =res.data.casts;
        this.Director()
        this.Editor()
        this.Casts()
        this.value = parseFloat(this.movie.voteAverage)
        this.recommend = res.data.otherMovies;
        console.log(res.data)
      }).catch((err)=>{
        console.log(err);
      })
    },
    Director(){
      const director = this.crews.find(crew => crew.job === 'Director');
      this.directorName = director ? director.name : '';
    },
    displayValue() {
      return this.value / 2;
    },
    Editor(){
      const editor = this.crews.find(crew => crew.job === 'Editor');
      this.editorName = editor ? editor.name : '';
    },
    Casts(){
      // 随机选择三到五个演员
      const minCount = 3;  // 最小演员数量
      const maxCount = 5;  // 最大演员数量
      const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * this.casts.length);
        this.mainCasts.push(this.casts[randomIndex]);
      }
    },
    saveScore() {
      this.data.tmdb_id = this.tmdb_id
      this.data.rate = this.value2
      const jsonData = JSON.stringify(this.data);
      console.log(this.value2)
      request.post('/singleMovie/rate',
          this.data,
          {
            headers:{'token':this.token.token}
          }
      ).then(res => {
        console.log(res)
      }).catch((err)=>{
        console.log(err);
      })
    },
    openDetail(item){
      //跳转详情页
      let pathInfo = this.$router.resolve({
        path:'/movie',
        query:{
          tmdbId:item.tmdbId
        }
      })
      window.open(pathInfo.href, '_blank');
    },
    search(){
      request.get('/search', {
        params: { query: this.text }
      }).then(res => {
        console.log(res)
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>

.custom-rate{
  margin-left:220px;
  transform: scale(2);
  align-self: flex-start; /* 添加 align-self 属性 */
}

.wrapper {
  background: url("@/assets/background.jpg");
  overflow: hidden;
}

.out_div {
  display: flex;
  flex: 1;
  flex-flow: row;
  align-items: flex-start;
}
.intro{
  color: #252b2b;
  font-weight: bold;
}
.picture{
  width: 30%;
}

.info{
  width: 700px;
  margin-top: 10px;
  display: flex; /* 添加 display 属性 */
  align-items: flex-start; /* 添加 align-items 属性 */
}

.info > div {
  margin-top: 10px; /* 调整垂直间距 */
}

section {
  display: flex;
  flex-flow: row;
}

article {
  padding: 10px;
  margin: 10px;
  background: rgba(204, 238, 238, 0.8); /* 使用 rgba() 函数设置背景透明度 */
  border-radius: 10px; /* 添加 border-radius 属性设置圆角 */
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