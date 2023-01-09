<template>
  <view class="card mg40">
    <view class="fs36 mgb20">{{ topic.title }}</view>
    <view class="fs24 mgb10"
      ><uni-dateformat
        :date="topic.createdAt"
        format="yyyy-MM-dd hh:mm"
      ></uni-dateformat
    ></view>
    <view class="mgb10 fwb">描述:</view>
    <view class="mgb10"> {{ topic.content }} </view>
  </view>
  <view class="flex aic mg40 jcsb">
    <view class="fs36">讨论：</view>
    <view @click="show = true" class="fs28 mc fwb">发表意见</view>
  </view>

  <view v-for="item in list" :key="item._id">
    <view class="card mg40">
      <view class="mgb10"> 社员: {{ item.user.name }} </view>
      <view class="fs24 mgb10"
        ><uni-dateformat
          :date="item.createdAt"
          format="yyyy-MM-dd hh:mm"
        ></uni-dateformat
      ></view>
      <view class="mgb10"> {{ item.content }} </view>
    </view>
  </view>
  <view v-if="end" class="area">无更多讨论</view>
  <page-container :show="show" @leave="show = false">
    <view class="mg40">
      <view @click="show = false" class="tar mc">关闭</view>
      <textarea
        maxlength="2000"
        class="input h100"
        v-model="content"
        placeholder="意见"
      ></textarea>
      <view class="mg40 flex aic">
        <button type="primary" @tap="submit">提交</button>
      </view>
    </view>
  </page-container>
</template>

<script>
import cf from "../../utils/cf.js";
export default {
  data() {
    return {
      show: false,
      content: "",
      topic: {},
      list: [],
      end: false,
    };
  },
  methods: {
    submit() {
      if (!this.content) {
        uni.showToast({
          title: "无内容",
          icon: "error",
        });
        return;
      }
      cf(
        "createDiscussion",
        { topicId: this.topic._id, content: this.content },
        true
      ).then((res) => {
        if (res) {
          uni.showToast({
            title: "提交成功",
            icon: "success",
          });
          this.list.push({
            _id: res.id,
            user: uni.getStorageSync("user"),
            content: this.content,
            createdAt: Date.now(),
          });
          this.show = false;
        }
      });
    },
    getList(topicId, skip) {
      cf("getDiscussions", { topicId, skip }, true).then((res) => {
        this.list = res.list || [];
        this.topic = res.topic;
        if (res.list.length < 100) {
          this.end = true;
        }
      });
    },
  },
  onLoad(e) {
    if (e.id) {
      this.getList(e.id);
    } else {
      uni.showToast({
        title: "无id",
        icon: "error",
      });
      uni.navigateBack({ delta: 1 });
    }
  },
  onShareAppMessage() {},
  onReachBottom() {
    if (!this.end) {
      this.getList(this.topic._id, this.list.length);
    }
  },
};
</script>
<style></style>
