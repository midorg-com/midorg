<template>
  <view v-for="(item, index) in list" :key="index">
    <view class="card mg40">
      <view class="fs36 mgb20">{{ item.skuData.title }}</view>
      <view class="fs28 mc mgb20">{{ item.success ? "成功" : "失败" }}</view>
      <view class="fs28 mgb20">订单ID：{{ item._id }}</view>
      <view class="mgb20 flex aic fs28">
        <view>时间：</view>
        <uni-dateformat
          :date="item.confirmedAt"
          format="yyyy-MM-dd hh:mm"
        ></uni-dateformat>
      </view>
      <view class="mgt20">课程：{{ item.skuData.course }}</view>
      <view v-if="item.right" class="mgt20 wba"
        >权益：<text @click="setClipboardData(item.right)" user-select>{{
          item.right
        }}</text></view
      >
      <!-- <view class="mgt20">份数：{{ item.count }}</view> -->
      <view v-if="item.total / 10" class="mgt20 flex">
        <view>获得积分：</view>
        <view class="scoreColor fwb">{{ item.total / 10 }}</view>
      </view>
      <view v-if="item.skuData.coin" class="mgt20 flex">
        <view>获得金币：</view>
        <view class="coinColor fwb">{{ item.skuData.coin * item.count }}</view>
      </view>
      <view v-if="item.skuData.share" class="mgt20 flex">
        <view>获得贡献：</view>
        <view class="shareColor fwb">{{
          item.skuData.share * item.count
        }}</view>
      </view>
    </view>
  </view>
  <view class="area">无更多订单</view>
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
    cf("getUserOrders", {}, true).then((res) => {
      this.list = res.data;
    });
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
