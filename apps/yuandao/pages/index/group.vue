<template>
  <view>
    <view class="card mg40">
      <view class="fs36 mgb20">增加学习环境非常非常非常重要</view>
      <view class="mgb20"
        >新人请添加我的微信加入新手村，如后续你的等级提升至相应段位，请再来本页面查看新群二维码。</view
      >
      <view class="bordereee">
        <view v-for="(item, index) in list" :key="index">
          <view class="mg20 flex">
            <view class="w150">等级{{ item.level }}:</view>
            <view>{{ item.name }}</view>
          </view>
        </view>
        <view class="mg20 flex">
          <view class="w150">待续</view>
        </view>
      </view>
      <view class="fs28 mgt20 mgb20"> 长按下方二维码识别</view>
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
import cf from "../../utils/cf.js";

export default {
  data() {
    return {
      src: "https://www.midorg.com/images/wx.jpg",
      list: [
        {
          level: 0,
          name: "新手村",
        },
        {
          level: 4,
          name: "静态丛林",
        },
        {
          level: 14,
          name: "前端营地",
        },
        {
          level: 40,
          name: "后端部落",
        },
        {
          level: 60,
          name: "架构山脉",
        },
        {
          level: 80,
          name: "全栈之都",
        },
        {
          level: 100,
          name: "产品联盟",
        },
      ],
    };
  },
  onLoad(options) {
    let user = uni.getStorageSync("user");
    let position = 0;
    for (let index = 0; index < this.list.length; index++) {
      if (user.totalLevel >= this.list[index].level) {
        position = index;
      } else {
        if (position > 0) {
          this.src =
            "https://www.midorg.com/images/level/" +
            this.list[position].level +
            ".jpg";
        }
        break;
      }
    }
    this.list[position].name = this.list[position].name + "(当前段位)";
  },
  methods: {
    onError() {
      this.src = "/static/images/wx.jpg";
    },
  },
  onShareAppMessage() {},
};
</script>
<style></style>
