<template>
  <view>
    <view v-for="(item, index) in userList" :key="item.userId">
      <view class="card mg40">
        <view class="fs36 mgb20 wba">昵称：{{ item.name || "无昵称" }}</view>
        <view class="mgb10">等级：{{ item.codeLevel }}</view>
        <view class="mgb10">
          个人网站：
          <text user-select>{{ item.site }}</text>
        </view>
        <view class="mgb10">简介：{{ item.bio }}</view>
        <view class="mgb10">申请：{{ item.application }}</view>
        <view class="flex aic jcsa mgt20">
          <view @tap="check(item._id, item.teamId, 'delete')" class="fs28 cr"
            >拒绝</view
          >
          <view
            @tap="check(item._id, item.teamId, 'create', item.userId)"
            class="fs28 mc"
            >同意</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import cf from "../../utils/cf.js";
export default {
  data() {
    return {
      userList: [],
    };
  },
  onLoad(e) {
    if (e.teamId) {
      cf(
        "getTeamApplications",
        {
          teamId: parseInt(e.teamId),
        },
        true
      ).then((res) => {
        this.userList = res;
      });
    }
  },
  methods: {
    check(id, teamId, action, userId) {
      cf(
        "checkTeamApplication",
        {
          action: action,
          teamId: teamId,
          userId: userId,
          _id: id,
        },
        true
      ).then((res) => {
        if (res) {
          this.userList = this.userList.filter((item) => item._id !== id);
          uni.showToast({
            title: "成功",
            icon: "success",
          });
        }
      });
    },
  },
  onShareAppMessage() {},
};
</script>
<style></style>
