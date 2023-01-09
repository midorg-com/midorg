<template>
  <view class="card mg40 pd0">
    <view class="flex jcsb">
      <view class="flex column aic jcc f1" :class="{ tab: type === 'totalLevel' }" @click="tab('totalLevel')">
        <view>等级榜</view>
      </view>
      <view class="flex column aic jcc f1" :class="{ tab: type === 'totalShare' }" @click="tab('totalShare')">
        <view>贡献榜</view>
      </view>
      <view class="flex column aic jcc f1" :class="{ tab: type === 'totalScore' }" @click="tab('totalScore')">
        <view>积分榜</view>
      </view>
      <view class="flex column aic jcc f1" :class="{ tab: type === 'totalCoin' }" @click="tab('totalCoin')">
        <view>金币榜</view>
      </view>
      <view class="flex column aic jcc f1" :class="{ tab: type === 'vip' }" @click="tab('vip')">
        <view>会员榜</view>
      </view>
    </view>
  </view>
  <view class="card mg40">
    <view v-for="(item, index) in list" :key="index">
      <view class="fs36 mgb20">
        昵称：{{ item.name || "无昵称" }}
        <text class="shareColor fs24 mg10" v-if="item.vip">vip{{ item.vip }}
        </text>
      </view>
      <view class="fs24 mgb20">ID：<text @click="setClipboardData(item._id)" user-select>{{
          item._id
        }}</text></view>
      <view v-if="item.site" class="mgb20 wba fs24">网站：<text class="wba" @click="setClipboardData(item.site)"
          user-select>{{
          item.site
        }}</text></view>
      <view class="flex jcsb fs24">
        <view class="flex aic mc">
          <view>等级:</view>
          <view> {{ item.totalLevel }}</view>
        </view>
        <view class="flex aic shareColor">
          <view>贡献:</view>
          <view> {{ item.totalShare }}</view>
        </view>
        <view class="flex aic scoreColor">
          <view>积分:</view>
          <view> {{ item.totalScore }}</view>
        </view>
        <view class="flex aic coinColor">
          <view>金币:</view>
          <view> {{ item.totalCoin }}</view>
        </view>
      </view>
      <view class="hr"></view>
    </view>
  </view>
</template>

<script>
  import cf from "../../utils/cf.js";
  export default {
    data() {
      return {
        type: "totalLevel",
        list: [],
      };
    },
    onLoad(options) {
      this.getRank(this.type);
    },
    methods: {
      getRank(type) {
        cf("getRank", {
          type
        }, true).then((res) => {
          if (res) {
            this.list = res.data;
          }
        });
      },
      tab(type) {
        this.type = type;
        this.getRank(type);
      },
      setClipboardData(d) {
        uni.setClipboardData({
          data: d,
          success: function() {},
        });
      },
    },
    onShareAppMessage() {},
  };
</script>
<style></style>
