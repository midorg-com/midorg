<template>
  <view class="card mg40">
    <view v-for="(item, index) in notifications" :key="item.createdAt">
      <view v-if="!item.url" class="fs28 mgb20 mgt20"
        ><uni-dateformat
          :date="item.createdAt"
          format="yyyy-MM-dd hh:mm"
          class="fs28 mgb10"
        ></uni-dateformat
        >: {{ item.content }}</view
      >
      <navigator v-if="item.url" :url="item.url" class="fs28 mgb20 mgt20"
        ><uni-dateformat
          :date="item.createdAt"
          format="yyyy-MM-dd hh:mm"
          class="fs28 mgb10"
        ></uni-dateformat
        >: {{ item.content }}</navigator
      >
      <view class="hr"> </view>
    </view>
  </view>
  <view class="area">无更多消息</view>
</template>

<script>
import cf from "../../utils/cf.js";
export default {
  data() {
    return {
      notifications: [],
    };
  },
  onLoad(options) {
    cf("getNotifications", {}, true).then((res) => {
      if (res) {
        this.notifications = res.read || [];
      }
    });
  },
  onShareAppMessage() {},
};
</script>
<style></style>
