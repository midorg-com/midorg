<template>
  <view>
    <navigator url="/pages/index/webview" class="card mg40 colorCard">
      <view class="fs36 mgb20">元岛社区介绍：</view>
      <view class="fs28 mgb10"
        >元岛是一个学习型 DAO
        (分布式自治组织)，有永久免费的新时代课程和丰富多彩的兴趣小组。你可以视元岛为在线大学、兴趣社区、无边界公司等。</view
      >
      <view class="fs28 mgb10"
        >元岛的所有权通过代码和数据归属于所有成员，社区决策将由所有社员加权投票驱动。</view
      >
      <view class="fs28 mgb10">欢迎来到 Web3.0 时代！</view>
      <view class="fs28 tar">点此查看详情 →</view>
    </navigator>

    <view class="card mg40">
      <view class="flex aic jcsa mgt20 mgb20">
        <button open-type="share" type="primary">邀请微信好友</button>
      </view>
    </view>
    <view class="card mg40">
      <view class="mgb20">
        你的专属微信外邀请链接(有效期30天，长按复制)：
      </view>
      <view class="fs24">
        <text user-select>{{ link }}</text>
      </view>
    </view>
    <view class="card mg40">
      <view class="mgb20">快来邀请小伙伴们加入元岛一起学习吧！</view>
      <view class="mgb20"
        >好友通过你的邀请或链接第一次进入元岛，提交第一节课作业并批改通过后双方都可以额外获得1贡献500积分和1金币奖励。</view
      >
      <view class="mgb20">好的友谊是互相鼓励共同进步，一起优秀</view>
    </view>
    <view class="fs36 mg40">邀请记录：</view>
    <view class="card mg40">
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
      link: "",
      list: [],
    };
  },
  onLoad() {
    uni.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage"],
    });
    cf("getInviteLink", {}).then((res) => {
      if (res.url_link) {
        this.link = res.url_link;
      }
    });
    cf("getUserLogs", { type: "invite" }).then((res) => {
      if (res) {
        this.list = res.data;
      }
    });
  },
  methods: {},
  onShareAppMessage(e) {
    let user = uni.getStorageSync("user");
    return {
      title: "邀请你加入元岛",
      path: "/pages/index/index?invite=" + user._id,
    };
  },
};
</script>

<style></style>
