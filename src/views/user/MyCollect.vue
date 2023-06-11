<template>
  <ul class="infinite-list" v-infinite-scroll="load">
    <collect-item class="infinite-list-item" v-for="a in allData" :key="a.id" v-bind:item="a"/>
    <el-empty v-if="allData.length == 0" :image-size="250" description="暂未收藏任何电影"></el-empty>
  </ul>
</template>

<script>
import CollectItem from './CollectItem.vue';
import request from "@/utils/request";
import Cookies from "js-cookie";

export default {
  components: {CollectItem},
  name: "MyCollect",
  data() {
    return {
      allData: [],
      token: JSON.parse(Cookies.get('token')),
      page: 0
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      request.get('/user/collection', {
        params: {page: this.page},
        headers: {'token': this.token.token}
      }).then(res => {
        this.allData = res.data.movieCollection;
        console.log(res.data.movieCollection)
      }).catch((err) => {
        console.log(err);
      })
    },
  },
};
</script>

<style>
.el-card {
  border-radius: 0;
}

.el-card:not(:first-child) {
  margin-top: 5px;

}

.infinite-list {
  overflow: auto;
  height: 450px;
}
</style>
