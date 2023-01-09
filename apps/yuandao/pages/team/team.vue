<template>
  <view>
    <view v-for="(item, index) in userList" :key="index">
      <view class="card mg40">
        <view class="fs36 mgb20 wba">昵称：{{ item.name || "无昵称" }}</view>
        <view class="mgb10">等级：{{ item.codeLevel }}</view>
        <view class="mgb10">
          <text class="fs24 wba" user-select>个人网站：{{ item.site }}</text>
        </view>
        <view class="mgb10">简介：{{ item.bio }}</view>
        <view v-if="item.role === 'leader'" class="mgb10 mc">小组长</view>
        <view v-if="leader" class="flex aic jcsa mgt20"
          ><view
            v-if="item.role !== 'leader'"
            @tap="remove(item._id)"
            class="fs28 cr"
            >移出小组</view
          ></view
        >
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
      leader: false,
    };
  },
  onLoad(e) {
    this.leader = e.role === "leader";
    if (e.teamId) {
      cf(
        "getTeamMembers",
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
    remove(id) {
      uni
        .showModal({
          title: "确认移出？",
          content: "",
        })
        .then((res) => {
          if (res.confirm) {
            cf(
              "deleteTeamMember",
              {
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
          }
        });
    },
  },
  onShareAppMessage() {},
};
</script>
<style></style>
