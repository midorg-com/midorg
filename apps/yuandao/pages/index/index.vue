<template>
  <view>
    <view class="card mg40">
      <view class="flex aic jcsb mgb20">
        <view class="fs36">
          {{ user.name || "未设置昵称" }}
          <text class="shareColor fs24 mg10" v-if="user.vip"
            >vip{{ user.vip }}
          </text>
        </view>
        <navigator url="/pages/user/profile" class="fs24 mc"
          >修改资料</navigator
        >
      </view>
      <text class="fs24">ID：</text>
      <text @click="setClipboardData(user._id)" class="fs24 mgb20">{{
        user._id
      }}</text>
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
      <view class="flex aic jcsa mgt20 mgb20">
        <navigator url="/pages/index/webview" class="fs28 mc fwb">
          关于元岛
        </navigator>
        <navigator url="/pages/index/consulting" class="fs28 mc fwb">
          企业服务
        </navigator>
        <navigator url="/pages/index/group" class="fs28 gc fwb">
          学习大群
        </navigator>
      </view>
    </view>
    <view v-if="notifications.length" class="card mg40">
      <view class="flex aic jcsb mgb20">
        <view class="fs36">新消息</view>
        <view class="fs24 mc" @click="readAll()">全部已读</view>
      </view>
      <view v-for="(item, index) in notifications" :key="index">
        <view>
          <view v-if="!item.url" class="fs28 mgb10">{{ item.content }}</view>
          <view v-if="item.url" @click="jump(item.url)" class="fs28 mgb10">{{
            item.content
          }}</view>
          <view class="fs28 mgb10">
            时间：
            <uni-dateformat
              :date="item.createdAt"
              format="MM-dd hh:mm"
            ></uni-dateformat>
          </view>
          <view class="hr"></view>
        </view>
      </view>
    </view>
    <view class="flex aic mg40 jcsb">
      <view class="fs36"
        >课程：《{{ lesson.course || "从零开始的编程之路" }}》</view
      >
      <navigator url="/pages/course/course" class="fs28 mc fwb">切换</navigator>
    </view>
    <view class="card mg40">
      <view class="flex aic jcsb mgb20">
        <view class="fs36">当前进度：{{ lesson.title || "等待最新章节" }}</view>
        <navigator url="/pages/course/lesson" class="mc fs28 shrink0">
          课程目录
        </navigator>
      </view>
      <view class="fs28 mgb10 flex">
        <view class="shrink0">摘要：</view>
        <view class="f1 c6">{{ lesson.know || "待更新" }}</view>
      </view>
      <view class="fs28 mgb10 flex">
        <view class="shrink0">作业：</view>
        <view class="f1 c6">{{ lesson.homework || "请勿提交，等待更新" }}</view>
      </view>
      <view class="fs28 mgb10 flex">
        <view class="shrink0">奖励：</view>
        <view class="f1 fww">
          <view v-if="lesson.score" class="flex jcsb">
            <view class="flex aic mc">
              <view>等级+</view>
              <view> {{ lesson.level }}</view>
            </view>
            <view v-if="lesson.share" class="flex aic shareColor">
              <view>贡献+</view>
              <view> {{ lesson.share }}</view>
            </view>
            <view class="flex aic scoreColor">
              <view>积分+</view>
              <view> {{ lesson.score }}</view>
            </view>
            <view class="flex aic coinColor">
              <view>金币+</view>
              <view> {{ lesson.coin }}</view>
            </view>
          </view>
          <view class="c6" v-if="lesson.reward">{{ lesson.reward }}</view>
        </view>
      </view>
      <view class="flex aic jcsa mgt40 mgb20">
        <view
          @click="
            jump(
              lesson.title
                ? '/pages/course/faq?id=' +
                    lesson.lessonId +
                    '&title=' +
                    lesson.title
                : '/pages/course/lesson'
            )
          "
          class="fs28 mc fwb"
          >常见问题</view
        >
        <view
          @click="
            jump(
              lesson.title
                ? '/pages/course/article?id=' +
                    lesson.lessonId +
                    '&title=' +
                    lesson.title
                : '/pages/course/lesson'
            )
          "
          class="fs28 mc fwb"
        >
          学习笔记
        </view>
        <view
          @click="
            jump(
              lesson.title
                ? '/pages/course/homework?id=' +
                    lesson.lessonId +
                    '&title=' +
                    lesson.title
                : '/pages/course/lesson'
            )
          "
          class="fs28 gc fwb"
        >
          提交作业
        </view>
      </view>
    </view>
    <view class="mg40 fs36">社区：</view>
    <view class="card mg40">
      <view class="flex aic jcsa mgt40">
        <navigator url="/pages/community/contribution" class="fs28 mc fwb">
          社区支持
        </navigator>
        <navigator url="/pages/community/roadmap" class="fs28 mc fwb">
          路线进展
        </navigator>
        <navigator url="/pages/community/rank" class="fs28 gc fwb">
          总排行榜
        </navigator>
      </view>
      <view class="flex aic jcsa mgt80">
        <navigator url="/pages/community/scholarship" class="fs28 mc fwb">
          申奖学金
        </navigator>
        <view @click="jump('/pages/community/topic', true)" class="fs28 mc fwb">
          事务讨论
        </view>
        <navigator url="/pages/index/job" class="fs28 mc fwb">
          招聘就业
        </navigator>
      </view>
      <view class="flex aic jcsa mgt80 mgb40">
        <view @click="jump('/pages/team/form', true)" class="fs28 mc fwb">
          创建小组
        </view>
        <view @click="jump('/pages/team/teamList', true)" class="fs28 mc fwb">
          加入小组
        </view>
        <view @click="jump('/pages/team/userTeams', true)" class="fs28 mc fwb">
          我的小组
        </view>
      </view>
    </view>
    <view class="mg40 fs36">工具(复制到Edge浏览器打开)：</view>
    <view class="card mg40">
      <view class="flex aic jcsa mgt20 mgb20">
        <view
          @click="setClipboardData('https://www.midorg.com/vsc.html')"
          class="fs28 mc fwb"
        >
          编程软件
        </view>
        <view
          @click="setClipboardData('https://www.midorg.com/map.html')"
          class="fs28 mc fwb"
        >
          知识图谱
        </view>
        <navigator
          url="/pages/index/webview?path=h.html"
          @click="setClipboardData('https://www.midorg.com/h.html')"
          class="fs28 mc fwb"
        >
          在线编写
        </navigator>
      </view>
    </view>
    <view class="mg40 fs36">我的：</view>
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
        url="/pages/manage/articleManage"
        v-if="course"
        class="flex aic jcsb pd20"
      >
        <view>分享管理{{ articleCount }}</view>
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
        url="/pages/manage/communityManage"
        v-if="community"
        class="flex aic jcsb pd20"
      >
        <view>社区管理</view>
        <image class="arrow" src="/static/images/icon/right.png" />
      </navigator>
      <navigator
        url="/pages/course/faq?id=miniprogram&title=小程序使用问题"
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
      notifications: [],
      lesson: {
        course: "",
        lessonId: "",
        title: "",
        homework: "",
        reward: "",
        coin: 1,
        level: 1,
        score: 100,
        share: 0,
      },
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
      articleCount: 0,
    };
  },
  onLoad(e) {
    if (e.invite) {
      uni.setStorageSync("invite", e.invite);
    }
  },
  onShow() {
    cf("getUser", {}).then((user) => {
      if (user) {
        if (user.ban) {
          uni
            .showModal({
              title: "账号被封禁",
              content: "如果有误封，请联系管理员解除",
            })
            .then(() => {
              uni.clearStorageSync();
              // #ifdef MP-WEIXIN
              wx.exitMiniProgram({});
              // #endif
            });
          return;
        }
        this.notifications = user.notifications;
        this.lesson = user.lesson;
        this.user = user;
        this.team = user.roles.includes("team");
        this.community = user.roles.includes("community");
        this.course = user.roles.includes("course");
        if (user.roles.includes("course")) {
          cf("getManageCounts", {}).then((res) => {
            this.homeworkCount = res.homeworkCount;
            this.teamFormCount = res.teamFormCount;
            this.questionCount = res.questionCount;
            this.articleCount = res.articleCount;
          });
        }
        uni.setStorageSync("user", user);
      }
    });
  },
  methods: {
    readAll() {
      this.notifications = [];
      cf("updateNotifications", {});
    },
    jump(url, check) {
      if (check && parseInt(this.user.totalLevel) < 4) {
        uni.showModal({
          title: "等级不足",
          content: "快去提交作业升级吧！4级后拥有权限。",
        });
        return;
      }
      uni.navigateTo({ url: url });
    },
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
