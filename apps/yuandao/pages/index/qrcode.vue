<template>
  <view>
    <view class="card mg40">
      <view class="fs36 mgb20">长按下方二维码识别：</view>
      <view v-if="tip" class="mgb20 mc">{{ tip }}</view>
      <view v-if="error" class="mgb20 cr">图片加载错误，请通知管理员</view>
      <image
        :src="src"
        class="w100"
        mode="widthFix"
        @error="onError"
        show-menu-by-longpress
      ></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: "https://www.midorg.com/images/wx.jpg",
      tip: "",
      error: false,
    };
  },
  onLoad(e) {
    if (e.path) {
      this.src = "https://www.midorg.com" + e.path;
    }
    if (e.tip) {
      this.tip = e.tip || "";
    }
  },
  methods: {
    onError() {
      this.src = "/static/images/wx.jpg";
      this.error = true;
    },
  },
  onShareAppMessage() {},
};
</script>
<style></style>
