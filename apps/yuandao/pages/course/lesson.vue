<template>
  <view v-for="(lesson, key) in list" :key="key">
    <view class="card mg40">
      <view class="flex aic jcsb mgb20">
        <view class="fs36">章节：{{ lesson.title }}</view>
        <view></view>
      </view>
      <view class="fs28 mgb10 flex">
        <view class="shrink0">摘要：</view>
        <view class="f1 c6">{{ lesson.know }}</view>
      </view>
      <view class="fs28 mgb10 flex">
        <view class="shrink0">作业：</view>
        <view class="f1 c6">{{ lesson.homework }}</view>
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
      <view class="fs28 mgb10 flex">
        <view class="shrink0">视频平台：</view>
        <view class="f1 c6">{{ lesson.platform }}</view>
      </view>
      <view class="fs28 mgb10 flex">
        <view class="shrink0">复制地址：</view>
        <view class="f1 c6">
          <text @click="setClipboardData(lesson.url)" user-select>{{
            lesson.url
          }}</text>
        </view>
      </view>
      <view v-if="lesson.passed" class="flex aic jcsa mgt40 mgb20">
        <view
          @click="
            jump(
              '/pages/course/faq?id=' +
                lesson.lessonId +
                '&title=' +
                lesson.title
            )
          "
          class="fs28 mc fwb"
          >常见问题</view
        >
        <view
          @click="
            jump(
              '/pages/course/article?id=' +
                lesson.lessonId +
                '&title=' +
                lesson.title
            )
          "
          class="fs28 mc fwb"
        >
          学习笔记
        </view>
        <view
          @click="
            jump(
              '/pages/course/homework?id=' +
                lesson.lessonId +
                '&title=' +
                lesson.title
            )
          "
          class="fs28 mc fwb"
        >
          查看作业
        </view>
      </view>
      <view v-if="!lesson.passed" class="flex aic jcsa mgt40 mgb20">
        <view class="fs28 c6">快去升级解锁答疑和资源吧</view>
      </view>
    </view>
  </view>
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
    let user = uni.getStorageSync("user");
    let lessonId = user.lesson.lessonId;
    if (!user) {
      lessonId = "re01-001-001";
    }
    cf("getLessons", {}).then((res) => {
      let passed = true;
      let list = [];
      for (let key in res) {
        if (key === lessonId) {
          if (!user.roles.includes("lesson")) {
            passed = false;
          }
          list.push({ passed: true, lessonId: key, ...res[key] });
        } else {
          list.push({ passed, lessonId: key, ...res[key] });
        }
      }
      this.list = list;
    });
  },
  methods: {
    jump(url) {
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
