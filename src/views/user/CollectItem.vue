<template>
  <div class="collectItem" @click="deleteItem">
    <div class="itemText">
      <!-- <div>{{ item.title }}</div> -->
      <h3>{{ item.title }}</h3>
    </div>
    <div class="itemImage">
      <img v-bind:src="item.posterPath" class="image"/>
    </div>
    <el-button class="el-button_wrapper" type="primary" size="large" @click="deleteItem(item)">删除</el-button>
  </div>
</template>

<script>
import request from "@/utils/request";
import Cookies from "js-cookie";

export default {
  name: "CollectItem",
  props: ["item"],
  data() {
    return {
      token: JSON.parse(Cookies.get('token'))
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {

    },
    deleteItem(item) {
      console.log(item.tmdbId);
      request.delete("/user/collection/" + item.tmdbId,
          {headers: {'token': this.token.token}}).then(res => {
            if (res.code === 200) {
              //window.location.reload("/personal/mycollect");
            } else {
              this.errorMessage = 'delete failed';
              this.alert();
            }
          }
      ).catch((err => {
        console.log(err);
      }))
    }
  },
  computed: {}
}
</script>

<style>
.collectItem {
  height: 120px;
  margin: 5px;
  display: flex;
}

.itemText {
  height: 120px;
  width: 70%;
}

.itemImage {
  height: 120px;
  width: 30%;
  margin-left: 5px;
  display: flex;
  justify-content: center;
}

.image {
  max-width: 100%;
  max-height: 120px;
}
</style>