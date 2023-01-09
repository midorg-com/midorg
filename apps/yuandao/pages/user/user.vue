<template>
  <view>
    <view class="card mg40">
      <view class="flex aic jcsb mgb20">
        <view class="fs36">
          {{ user.name || "元岛社员：未设置昵称" }}
          <text class="shareColor fs24 mg10" v-if="user.vip"
            >vip{{ user.vip }}
          </text>
        </view>
        <navigator url="/pages/user/profile" class="fs24 mc"
          >修改资料</navigator
        >
      </view>
      <text class="fs24">ID：</text>
      <text
        @click="setClipboardData(user._id)"
        user-select
        class="fs24 mgb20"
        >{{ user._id }}</text
      >
      <view class="flex mgt40 jcsb fs28">
        <navigator url="/pages/user/log?type=share" class="flex column aic">
          <image class="icon mgb10" src="/static/images/user/share.png"></image>
          <view class="shareColor fs36">{{ user.share }}</view>
          <view>贡献</view>
        </navigator>
        <navigator url="/pages/user/log?type=coin" class="flex column aic">
          <image class="icon mgb10" src="/static/images/user/coin.png"></image>
          <view class="coinColor fs36">{{ user.coin }}</view>
          <view>金币</view>
        </navigator>
        <navigator url="/pages/user/log?type=score" class="flex column aic">
          <image class="icon mgb10" src="/static/images/user/score.png"></image>
          <view class="scoreColor fs36">{{ user.score }}</view>
          <view>积分</view>
        </navigator>
        <navigator url="/pages/user/log?type=level" class="flex column aic">
          <image class="icon mgb10" src="/static/images/user/level.png"></image>
          <view class="mc fs36">{{ user.totalLevel || 0 }}</view>
          <view>等级</view>
        </navigator>
      </view>
    </view>
    <view class="card mg40">
      <navigator url="/pages/user/log" class="flex aic jcsb pd20">
        <view>奖励记录</view>
        <image class="arrow" src="/static/images/icon/right.png" />
      </navigator>
      <navigator url="/pages/user/invite" class="flex aic jcsb pd20">
        <view>邀请好友</view>
        <image class="arrow" src="/static/images/icon/right.png" />
      </navigator>
      <navigator url="/pages/user/notification" class="flex aic jcsb pd20">
        <view>我的消息</view>
        <image class="arrow" src="/static/images/icon/right.png" />
      </navigator>
      <navigator url="/pages/user/userHomework" class="flex aic jcsb pd20">
        <view>我的作业</view>
        <image class="arrow" src="/static/images/icon/right.png" />
      </navigator>
      <navigator url="/pages/user/userQuestion" class="flex aic jcsb pd20">
        <view>我的提问</view>
        <image class="arrow" src="/static/images/icon/right.png" />
      </navigator>
      <navigator url="/pages/user/order" class="flex aic jcsb pd20">
        <view>我的订单</view>
        <image class="arrow" src="/static/images/icon/right.png" />
      </navigator>

      <navigator
        url="/pages/manage/homeworkManage"
        v-if="course"
        class="flex aic jcsb pd20"
      >
        <view>作业管理{{ homeworkCount }}</view>
        <image class="arrow" src="/static/images/icon/right.png" />
      </navigator>
      <navigator
        url="/pages/manage/teamManage"
        v-if="team"
        class="flex aic jcsb pd20"
      >
        <view>小组管理{{ teamFormCount }}</view>
        <image class="arrow" src="/static/images/icon/right.png" />
      </navigator>
      <navigator
        url="/pages/manage/questionManage"
        v-if="course"
        class="flex aic jcsb pd20"
      >
        <view>问题管理{{ questionCount }}</view>
        <image class="arrow" src="/static/images/icon/right.png" />
      </navigator>
      <navigator
        url="/pages/manage/faqManage"
        v-if="course"
        class="flex aic jcsb pd20"
      >
        <view>问答管理</view>
        <image class="arrow" src="/static/images/icon/right.png" />
      </navigator>
      <navigator
        url="/pages/manage/articleManage"
        v-if="course"
        class="flex aic jcsb pd20"
      >
        <view>文章管理</view>
        <image class="arrow" src="/static/images/icon/right.png" />
      </navigator>
      <navigator
        url="/pages/manage/communityManage"
        v-if="community"
        class="flex aic jcsb pd20"
      >
        <view>社区管理</view>
        <image class="arrow" src="/static/images/icon/right.png" />
      </navigator>
      <navigator
        url="/pages/course/faq?id=miniprogram&title=小程序问题"
        class="flex aic jcsb pd20"
      >
        <view>小程序使用问题</view>
        <image class="arrow" src="/static/images/icon/right.png" />
      </navigator>
    </view>
  </view>
</template>

<script>
import cf from "../../utils/cf.js";
export default {
  data() {
    return {
      user: {
        name: "",
        bio: "",
        site: "",
        _id: "",
        share: 0,
        coin: 0,
        score: 0,
        totalLevel: 0,
      },
      course: false,
      team: false,
      community: false,
      homeworkCount: 0,
      teamFormCount: 0,
      questionCount: 0,
    };
  },
  onShow: function () {
    let user = uni.getStorageSync("user");
    if (user) {
      this.user = user;
      this.team = user.roles.includes("team");
      this.community = user.roles.includes("community");
      this.course = user.roles.includes("course");
      if (user.roles.includes("course")) {
        cf("getManageCounts", {}).then((res) => {
          this.homeworkCount = res.homeworkCount;
          this.teamFormCount = res.teamFormCount;
          this.questionCount = res.questionCount;
        });
      }
    } else {
      uni.redirectTo({
        url: "/pages/index/index",
      });
    }
  },
  methods: {
    setClipboardData(d) {
      uni.setClipboardData({
        data: d,
        success: function () {},
      });
    },
  },
  onShareAppMessage() {},
};
</script>
<style></style>
