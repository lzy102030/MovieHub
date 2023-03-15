<template>
  <div>
    <!--搜索框-->
    <div style="margin-bottom: 20px">
      <el-input style="width: 240px" placeholder="请输入搜索内容"></el-input>
      <el-button type="primary" style="margin-left: 10px"><i class="el-icon-search"></i>搜索</el-button>
    </div>

    <!--card-->
    <div>
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in 6" :key="item">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">{{ item }}</img>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <el-row>
        <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
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

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>

<script>
import request from "@/utils/request";

export default {
  name: 'HomeView',
  data() {
    return {
      currentDate: new Date(),
      params:{
        total: 0,
        pageNum: 1,

      }
    };
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      request.get('/test').then(res=>{
        this.params.total=res.total
      })
    },
    handlecurrentChange(pageNum){
      console.log(pageNum)
    }
  }
}
</script>
