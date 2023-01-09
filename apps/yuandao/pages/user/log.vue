<template>
  <view>
    <view class="card mg40">
      <view class="flex aic jcsb mgb20">
        <view class="fs36">{{ user.name || "未设置昵称" }}</view>
      </view>
      <view class="mgb20">
        <text>ID：</text>
        <text class="fs24" user-select>{{ user._id }}</text>
      </view>
      <view class="mgb20"> 总贡献：{{ user.totalShare }} </view>
      <view class="mgb20"> 当前贡献：{{ user.share }} </view>
      <view class="mgb20"> 总金币：{{ user.totalCoin }} </view>
      <view class="mgb20"> 当前金币：{{ user.coin }} </view>
      <view class="mgb20"> 总积分：{{ user.totalScore }} </view>
      <view class="mgb20"> 当前积分：{{ user.score }} </view>
      <view class="mgb20"> 总等级：{{ user.totalLevel }} </view>
      <view class="mgb20"> 编程课等级：{{ user.codeLevel }} </view>
      <navigator
        url="/pages/course/faq?id=miniprogram&title=账号问题"
        class="tar mc"
      >
        查看解释
      </navigator>
    </view>
    <view class="fs36 mg40">记录：</view>
    <view class="card mg40">
      <view class="flex jcsb tabbar">
        <view
          class="flex column aic jcc f1"
          :class="{ tab: type === '' }"
          @click="tab('')"
        >
          <view>所有</view>
        </view>
        <view
          class="flex column aic jcc f1"
          :class="{ tab: type === 'share' }"
          @click="tab('share')"
        >
          <view>贡献</view>
        </view>
        <view
          class="flex column aic jcc f1"
          :class="{ tab: type === 'coin' }"
          @click="tab('coin')"
        >
          <view>金币</view>
        </view>
        <view
          class="flex column aic jcc f1"
          :class="{ tab: type === 'score' }"
          @click="tab('score')"
        >
          <view>积分</view>
        </view>
        <view
          class="flex column aic jcc f1"
          :class="{ tab: type === 'level' }"
          @click="tab('level')"
        >
          <view>等级</view>
        </view>
        <view
          class="flex column aic jcc f1"
          :class="{ tab: type === 'invite' }"
          @click="tab('invite')"
        >
          <view>邀请</view>
        </view>
      </view>
      <view v-for="(item, index) in list" :key="index">
        <view class="mgt10 fs28">
          时间：
          <uni-dateformat
            :date="item.createdAt"
            format="yyyy-MM-dd hh:mm:ss"
            class="fs28"
          ></uni-dateformat>
        </view>
        <view class="mgt10 wba fs28">{{ item.content }}</view>
        <view class="fs24 mgt10 flex jcsb">
          <view v-if="item.share" class="shareColor"
            >贡献+{{ item.share }}</view
          >
          <view v-if="item.coin" class="coinColor">金币+{{ item.coin }}</view>
          <view v-if="item.score" class="scoreColor"
            >积分+{{ item.score }}</view
          >
          <view v-if="item.level" class="mc">等级+{{ item.level }}</view>
        </view>
        <view class="hr"></view>
      </view>
      <view class="area">暂无更多记录</view>
    </view>
  </view>
</template>

<script>
import cf from "../../utils/cf.js";
export default {
  data() {
    return {
      user: {},
      list: [],
      type: "",
    };
  },
  onLoad: function (e) {
    this.type = e.type || "";
    this.user = uni.getStorageSync("user");
    this.getLogs(e.type);
  },
  methods: {
    tab(type) {
      this.type = type;
      this.getLogs(type);
    },
    getLogs(type) {
      cf("getUserLogs", { type }, true).then((res) => {
        if (res) {
          this.list = res.data;
        }
      });
    },
  },
  onShareAppMessage() {},
};
</script>
<style></style>
