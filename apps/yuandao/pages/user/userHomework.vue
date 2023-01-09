<template>
  <view v-for="(item, index) in list" :key="index">
    <view class="card mg40">
      <view class="fs36 mgb20">{{ item.title }}</view>
      <view class="fs28 mc mgb20">{{ item.status }}</view>
      <view class="mgb20 flex aic">
        <view>提交时间：</view>
        <uni-dateformat
          :date="item.updatedAt"
          format="yyyy-MM-dd hh:mm"
        ></uni-dateformat>
      </view>
      <view v-if="item.comment" class="mgt20"
        >作业评价：{{ item.comment }}</view
      >
      <view v-if="item.score" class="mgt20 flex">
        <view>获得积分：</view>
        <view class="scoreColor fwb">{{ item.score }}</view>
      </view>
      <view v-if="item.coin" class="mgt20 flex">
        <view>获得金币：</view>
        <view class="coinColor fwb">{{ item.coin }}</view>
      </view>
      <view v-if="item.share" class="mgt20 flex">
        <view>获得贡献：</view>
        <view class="shareColor fwb">{{ item.share }}</view>
      </view>
      <view class="flex aic jcsa mgt40 mgb20">
        <navigator
          :url="
            '/pages/course/faq?id=' + item.lessonId + '&title=' + item.title
          "
          class="fs28 mc fwb"
          >问题答疑</navigator
        >
        <navigator
          :url="'/pages/course/lesson?id=' + item.lessonId"
          class="fs28 mc fwb"
          >章节知识</navigator
        >
        <navigator
          :url="'/pages/course/homework?id=' + item.lessonId"
          class="fs28 mc fwb"
          >{{ item.status === "已批改" ? "去刷分" : "修改作业" }}</navigator
        >
      </view>
    </view>
  </view>
  <view class="area">无更多作业</view>
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
    cf("getUserHomeworks", {}, true).then((res) => {
      this.list = res.data;
    });
  },
  methods: {},
  onShareAppMessage() {},
};
</script>
<style></style>
