<template>
  <view v-for="(item, index) in teamList" :key="item._id">
    <view class="card mg40">
      <view class="fs36 mgb20 wba">小组名：{{ item.groupName }}</view>
      <view class="mgb10">类型：{{ item.type }}</view>
      <view class="mgb10 wba">介绍：{{ item.intro }}</view>
      <view class="mgb10 wba">微信：{{ item.wx }}</view>
      <view class="mgb10" v-if="item.checkActivity || item.checkLevel || item.checkAge || item.checkRegion">限制项：</view>
      <view class="flex aic fww">
        <view v-if="item.checkActivity" class="tag">要求活跃</view>
        <view v-if="item.checkLevel" class="tag">最低等级：{{ item.minLevel }}</view>
        <view v-if="item.checkAge" class="tag">年龄：{{ item.age }}</view>
      </view>
      <view class="flex aic jcsa mgt20">
        <view @tap="checkTeamForm(item._id, 'delete')" class="fs28 cr fwb">拒绝</view>
        <view @tap="checkTeamForm(item._id, 'create')" class="fs28 mc fwb">通过</view>
      </view>
    </view>
  </view>
</template>

<script>
import cf from "../../utils/cf.js";
export default {
  data() {
    return {
      teamList: []
    };
  },
  onLoad() {
    cf("getTeamForms", {}, true).then(res => {
      this.teamList = res;
    });
  },
  methods: {
    checkTeamForm(_id, action) {
      cf("checkTeamForm", { _id, action }).then(res => {
        if (res) {
          this.teamList = this.teamList.filter(item => item._id !== _id);
          uni.showToast({
            icon: "success",
            title: "完成"
          });
        }
      });
    }
  }
};
</script>

<style></style>
