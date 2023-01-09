<template>
  <view class="card mg40">
    <view class="fs36 mgb20">自律打卡</view>
    <view class="fs28 mgb20">正式功能将在下个版本推出</view>
  </view>
  <view class="flex aic jcc column">
    <button v-if="!show" type="primary" class="mg80" @tap="click">打卡</button>
    <icon v-if="show" size="180rpx" class="mg80" type="success"></icon>
    <view class="mg40">{{ time }}</view>
    <view>{{ tip }}</view>
  </view>
</template>

<script>
// pages/clockin/index.js
export default {
  data() {
    return {
      tip: "今日待打卡",
      show: false,
      time: "",
    };
  },
  onLoad(options) {
    let d = new Date();
    let time = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    let s = uni.getStorageSync("clockin");

    if (time === s) {
      this.tip = "今日已打卡";
      this.show = true;
      this.time = time;
    }
  },
  methods: {
    click() {
      let d = new Date();
      let time = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      uni.setStorageSync("clockin", time);
      this.tip = "今日已打卡";
      this.show = true;
      this.time = time;
    },
  },
  onShareAppMessage() {},
};
</script>
<style></style>
