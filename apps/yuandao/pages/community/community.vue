<template>
  <view>
    <view class="card mg40">
      <view class="fs36">社区动态：</view>
      <view v-for="(item, index) in list" :key="index">
        <view class="fs28 mgt20 mgb10">{{ item.content }}</view>
        <uni-dateformat
          :date="item.createdAt"
          format="yyyy-MM-dd hh:mm"
          class="fs24"
        ></uni-dateformat>
      </view>
    </view>
    <view class="card mg40">
      <view class="flex aic jcsa mgt20 mgb20">
        <navigator url="/pages/community/rank" class="fs28 mc fwb">
          排行榜
        </navigator>
        <navigator url="/pages/community/scholarship" class="fs28 mc fwb">
          奖学金申请
        </navigator>
      </view>
    </view>
    <view class="mg40 fs36">社区事务：</view>
    <view class="card mg40">
      <view class="flex aic jcsa mgt20 mgb20">
        <view @click="jump('/pages/community/topic')" class="fs28 mc fwb">
          事务讨论
        </view>
        <navigator url="/pages/community/roadmap" class="fs28 mc fwb">
          路线进展
        </navigator>
        <navigator url="/pages/community/contribution" class="fs28 mc fwb">
          社区贡献
        </navigator>
      </view>
    </view>

    <view class="mg40 fs36">兴趣小组：</view>
    <view class="card mg40">
      <view class="flex aic jcsa mgt20 mgb20">
        <view @click="jump('/pages/team/form')" class="fs28 mc fwb">
          创建小组
        </view>
        <view @click="jump('/pages/team/teamList')" class="fs28 mc fwb">
          加入小组
        </view>
        <view @click="jump('/pages/team/userTeams')" class="fs28 mc fwb">
          我的小组
        </view>
      </view>
    </view>
    <view class="placeholder"></view>
  </view>
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
    cf("getCommunityNews", {}, true).then((res) => {
      if (res) {
        this.list = res.data;
      }
    });
  },
  methods: {
    jump(url) {
      let user = uni.getStorageSync("user");
      if (parseInt(user.totalLevel) > 3) {
        uni.navigateTo({
          url,
        });
      } else {
        uni.showModal({
          title: "等级不足",
          content: "快去提交作业升级吧！4级后拥有权限。",
        });
      }
    },
  },
  onShareAppMessage() {},
};
</script>
<style></style>
