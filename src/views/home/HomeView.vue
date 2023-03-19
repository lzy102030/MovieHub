<template>
  <div>

<!--    <div style="margin-bottom: 20px; text-align: center">-->
<!--      <el-input style="width: 240px; " placeholder="请输入搜索内容"></el-input>-->
<!--      <el-button type="primary" style="margin-left: 10px"><i class="el-icon-search"></i>搜索</el-button>-->
<!--    </div>-->

    <!--走马灯-->
    <div>
        <el-carousel :interval="4000" type="card" height="250px">
          <el-carousel-item v-for="item in imgList" :key="item" @change="carouselChange">
            <el-image
                style="width: 100%; height: 100%"
                :src="item.img"></el-image>
          </el-carousel-item>
        </el-carousel>
    </div>
    <!--card-->
    <div style="margin-left: 0px">
      <el-row>
        <el-col :span="4" v-for="item in movie" :key="item" :offset="item.id > 0 ? 2 : 1">
          <el-card :body-style="{ padding: '0px' } ">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                 class="image">
            <div style="padding: 14px;">
              <span>{{item.name}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4" v-for="item in movie" :key="item" :offset="item.id > 0 ? 2 : 1" style="margin-top: 20px">
          <el-card :body-style="{ padding: '0px' } ">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                 class="image">
            <div style="padding: 14px;">
              <span>{{item.name}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
    <!--分页-->
    <div style="margin-top: 20px">
      <el-pagination
          background
          :page-size="5"
          layout="prev, pager, next"
          @current-change="handlecurrentChange"
          :total="params.total">
      </el-pagination>
    </div>
  </div>
</template>

<style>
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

.el-carousel__item:nth-child(2n) {
  background-color: black;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: white;
}
</style>

<script>
import request from "@/utils/request";

export default {
  name: 'HomeView',
  data() {
    return {
      currentDate: new Date(),
      imgList: [
        {id:0,img:require("@/assets/logo.png")},
        {id:1,img:require("@/assets/test.jpg")},
        {id:2,img:require("@/assets/logo.png")},
        {id:3,img:require("@/assets/test.jpg")},
      ],
      params: {
        total: 100,
        pageNum: 1,
      },
      movie:[
        {id:0,name:'superman'},
        {id:1,name:'spiderman'},
        {id:2,name:'badman'},
        {id:3,name:'revenger'},
      ],
    };
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      // request.get('/test').then(res => {
      //   this.params.total = res.total
      // })
    },
    handlecurrentChange(pageNum) {
      console.log(pageNum)
    },
    carouselChange(now, prev){
      console.log("图片索引切换: " + prev + "--->" + now);
      //this.photo = "@/assets/logo.png"
    }
  }
}
</script>
