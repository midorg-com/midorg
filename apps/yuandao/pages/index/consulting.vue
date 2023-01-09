<template>
  <view>
    <view v-if="list.length" class="card mg40">
      <view v-for="(item, index) in list" :key="index">
        <view class="mgt20 wba">{{ item }} </view>
      </view>
    </view>
    <template v-for="(item, index) in images" :key="index">
      <image class="pureImg" :src="item" mode="widthFix" show-menu-by-longpress />
    </template>
  </view>
</template>

<script>
  import cf from "../../utils/cf.js";

  export default {
    data() {
      return {
        list: [],
        images: [`https://www.midorg.com/images/consulting/a1.png`],
      };
    },
    onLoad(options) {
      cf("getConsulting", {}, true).then((res) => {
        if (res) {
          if (res.data[0]) {
            this.list = res.data || [];
          }
          if (res.images[0]) {
            this.images = res.images;
          }
        }
      });
    },
    onShareAppMessage() {},
  };
</script>
<style>
  .pureImg {
    margin: 0;
    width: 100%;
    display: block;
  }

  page {
    padding: 0;
    min-height: 300vh;
  }
</style>
