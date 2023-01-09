<template>
  <view v-for="item in list" :key="item._id">
    <view class="card mg40">
      <view class="fs36 mgb20">{{ item.title }}</view>
      <view class="fs24 mgb10"
        ><uni-dateformat
          :date="item.createdAt"
          format="yyyy-MM-dd hh:mm"
        ></uni-dateformat
      ></view>
      <view class="mgb10 fwb">描述:</view>
      <view class="mgb10"> {{ item.content }} </view>
      <navigator
        :url="'/pages/community/discussion?id=' + item._id"
        class="mgb10 mc tac mgt20"
      >
        有{{ item.discussions }}条讨论,点击查看
      </navigator>
    </view>
  </view>
  <view class="area c6">无更多事务</view>
</template>

<script>
import cf from "../../utils/cf.js";
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {},
  onShow() {
    cf("getTopics", { type: "vote" }, true).then((res) => {
      this.list = res || [];
    });
  },
  onShareAppMessage() {},
};
</script>
<style></style>
