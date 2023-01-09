<template>
  <view>
    <view v-for="(item, index) in teamList" :key="item.teamId">
      <view class="card mg40">
        <view class="fs36 mgb20 wba">小组名：{{ item.team.groupName }}</view>
        <view class="mgb10">组号：{{ item.teamId }}</view>
        <view class="mgb10">类型：{{ item.team.type }}</view>
        <view class="mgb10 wba">介绍：{{ item.team.intro }}</view>
        <view
          class="mgb10"
          v-if="
            item.team.checkActivity ||
            item.team.checkLevel ||
            item.team.checkAge ||
            item.team.checkRegion
          "
          >限制项：</view
        >
        <view class="flex aic fww">
          <view v-if="item.team.checkActivity" class="tag">要求活跃</view>
          <view v-if="item.team.checkLevel" class="tag"
            >最低等级：{{ item.team.minLevel }}</view
          >
          <view v-if="item.team.checkAge" class="tag"
            >年龄：{{ item.team.age - 2 + " - " + (item.team.age + 1) }}</view
          >
        </view>
        <view v-if="item.team.wxNumber" class="mgb10"
          >联系方式：{{ item.team.wxNumber }}</view
        >
        <view class="mgb10"> 小组群： </view>
        <image
          v-if="item.team.wx"
          :src="item.team.wx"
          mode="widthFix"
          class="w100"
          show-menu-by-longpress
        />
        <view class="flex aic jcsa mgt20">
          <navigator
            v-if="item.role === 'leader'"
            :url="'/pages/team/form?team=' + item.teamString"
            class="fs28 mc fwb"
            >修改资料</navigator
          >
          <navigator
            v-if="item.role === 'leader' && item.team.approve"
            :url="'/pages/team/teamApplication?teamId=' + item.teamId"
            class="fs28 mc fwb"
            >审核申请</navigator
          >
          <view
            v-if="item.role !== 'leader'"
            @tap="remove(item._id)"
            class="fs28 mc fwb"
            >退出小组</view
          >
          <navigator
            :url="
              '/pages/team/team?teamId=' + item.teamId + '&role=' + item.role
            "
            class="fs28 mc fwb"
            >小组成员</navigator
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
      teamList: [],
    };
  },
  onShow(options) {
    cf("getUserTeams", {}, true).then((res) => {
      this.teamList =
        res.map((item) => {
          item.teamString = JSON.stringify(item.team);
          return item;
        }) || [];
    });
  },
  methods: {
    remove(_id) {
      uni
        .showModal({
          title: "确认退出？",
          content: "",
        })
        .then((res) => {
          if (res.confirm) {
            cf(
              "deleteTeamMember",
              {
                _id: _id,
              },
              true
            ).then((res) => {
              if (res) {
                this.teamList = this.teamList.filter(
                  (item) => item._id !== _id
                );
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
<style>
/* pages/myTeam/index.wxss */
</style>
