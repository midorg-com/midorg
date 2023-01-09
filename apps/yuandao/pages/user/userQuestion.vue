<template>
  <view v-for="(item, index) in list" :key="index">
    <view class="card mg40">
      <view class="fs36 mgb20">问题：</view>
      <view class="mgb20"> {{ item.question }}</view>
      <view class="fs36 mgb20">时间：</view>
      <uni-dateformat
        :date="item.createdAt"
        format="yyyy-MM-dd hh:mm"
        class="mgb20"
      ></uni-dateformat>
      <view class="fs36 mgb20 mgt20">图片：</view>
      <view class="flex aic fww">
        <view v-for="(file, index) in item.files" :key="index">
          <view class="tac pd8 bordereee">
            <image
              @click="preview(item.files, file.url)"
              :src="file.url"
              class="smallImg"
            ></image>
          </view>
        </view>
      </view>
      <view v-if="item.answer" class="fs36 mgb20 mgt20 mc"> 回答：</view>
      <view v-if="item.answer" class="mgb20">{{ item.answer }}</view>
      <view v-if="item.adopted" class="fs36 mgb20 mgt20 mc">已采纳</view>
      <view v-if="item.adopted" class="mgb20">奖励贡献：1</view>
      <view v-if="item.adopted" class="mgb20">奖励金币：1</view>
      <view v-if="item.adopted" class="mgb20">奖励积分：200</view>
    </view>
  </view>
  <view class="area">无更多问题</view>
</template>

<script>
import cf from "../../utils/cf.js";

export default {
  data() {
    return {
      list: [],
    };
  },
  onLoad(options) {
    cf("getUserQuestions", {}, true).then((res) => {
      this.list = res.data;
    });
  },
  methods: {
    preview(files, url) {
      uni.previewImage({
        urls: files.map((item) => item.url),
        current: url,
      });
    },
  },
  onShareAppMessage() {},
};
</script>
<style></style>
