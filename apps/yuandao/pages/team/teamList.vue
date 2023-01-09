<template>
  <view>
    <view>
      <view class="mg40">
        <form @submit="query">
          <view class="fs36">查询条件：</view>
          <view class="flex">
            <view class="mgr20"
              ><input
                :maxlength="5"
                class="input"
                name="_id"
                style="margin: 0"
                placeholder="小组ID"
            /></view>
            <view
              ><input
                maxlength="30"
                class="input"
                style="margin: 0"
                name="groupName"
                placeholder="查询小组名"
            /></view>
          </view>
          <view>
            <radio-group class="mgt40" :value="type" name="type">
              <text>类型：</text>
              <label>
                <radio value="兴趣" />
                兴趣
              </label>
              <label>
                <radio value="项目" />
                项目
              </label>
              <label>
                <radio value="目标" />
                目标
              </label>
            </radio-group>
          </view>
          <view class="mgt40">
            <text>限制项：</text>
            <switch :checked="limit" @change="onLimit"></switch>
            <checkbox-group v-if="limit" class="mgt40" name="check">
              <label>
                <checkbox value="checkActivity" />
                高活跃度
              </label>
              <label>
                <checkbox value="checkLevel" />
                等级
              </label>
              <label>
                <checkbox value="checkAge" />
                年龄
              </label>
              <label>
                <checkbox value="checkRegion" />
                地区
              </label>
            </checkbox-group>
          </view>
          <view class="flex aic mgt20">
            <button class="c6" style="margin-right: 30rpx" formType="reset">
              重置
            </button>
            <button type="primary" formType="submit">查询</button>
          </view>
        </form>
      </view>
      <view class="flex aic jcsb mg40">
        <view class="fs36">小组列表：</view>
        <navigator url="/pages/team/form" class="fs28 mc fwb"
          >创建小组</navigator
        >
      </view>
      <view v-for="(item, index) in teamList" :key="item._id">
        <view class="card mg40">
          <view class="fs36 mgb20 wba">小组名：{{ item.groupName }}</view>
          <view class="mgb10">组号：{{ item._id }}</view>
          <view class="mgb10">类型：{{ item.type }}</view>
          <view class="mgb10 wba">介绍：{{ item.intro }}</view>
          <view
            class="mgb10"
            v-if="
              item.checkActivity ||
              item.checkLevel ||
              item.checkAge ||
              item.checkRegion
            "
            >限制项：</view
          >
          <view class="flex aic fww">
            <view v-if="item.checkActivity" class="tag">要求活跃</view>
            <view v-if="item.checkLevel" class="tag"
              >最低等级：{{ item.minLevel }}</view
            >
            <view v-if="item.checkAge" class="tag"
              >年龄：{{ item.age - 2 + " - " + (item.age + 1) }}</view
            >
          </view>
          <view class="flex aic jcsa mgt20">
            <view @tap="joinTeam(item._id, item.approve)" class="fs28 mc fwb">{{
              item.approve ? "申请加入" : "加入小组"
            }}</view>
          </view>
        </view>
      </view>
      <view class="tac c3 fs36 mg60" v-if="!teamList.length"
        >无对应小组，可以点击右上方按钮自行创建所需小组</view
      >
    </view>
    <page-container :show="show" @leave="show = false">
      <view class="mg40">
        <view class="fs36">申请：</view>
        <input
          maxlength="100"
          class="input"
          name="application"
          :value="application"
          @input="onChange"
          placeholder="申请说明"
        />
        <view class="area"
          ><button
            type="primary"
            style="margin: 30rpx 0"
            @tap="createApplication"
          >
            提交
          </button></view
        >
      </view>
    </page-container>
  </view>
</template>

<script>
import cf from "./../../utils/cf.js";
export default {
  data() {
    return {
      teamList: [],
      loading: false,
      limit: false,
      show: false,
      application: "",
      teamId: "",
      type: "",
    };
  },
  onLoad(options) {
    cf("getTeamList", {}, true).then((res) => {
      this.teamList = res;
    });
  },
  methods: {
    onLimit(e) {
      this.limit = e.detail.value;
    },

    query: function (e) {
      let u = e.detail.value;
      let form = {
        groupName: u.groupName,
        type: u.type,
        _id: parseInt(u._id),
        check: u.check,
        limit: this.limit,
      };

      if (this.loading) {
        return;
      }

      this.loading = true;

      cf("getTeamList", form, true)
        .then((res) => {
          if (res) {
            this.teamList = res;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    onChange(e) {
      this.application = e.detail.value;
    },

    createApplication(e) {
      cf(
        "createTeamApplication",
        {
          teamId: this.teamId,
          application: this.application,
        },
        true
      ).then((res) => {
        if (res) {
          uni.showToast({
            title: "已申请，待通过",
            icon: "success",
          });
          this.show = false;
          this.application = "";
          this.teamId = "";
        }
      });
    },

    joinTeam(id, approve) {
      if (approve) {
        this.show = true;
        this.teamId = id;
      } else {
        uni.showModal({
          title: "确认加入？",

          success(res) {
            if (res.confirm) {
              cf(
                "createTeamMember",
                {
                  teamId: id,
                },
                true
              ).then((res) => {
                if (res) {
                  uni.showModal({
                    title: "加入成功",
                    content:
                      "请前往我的小组页面添加组长微信进群，备注：元岛小组",
                    success(res) {
                      if (res.confirm) {
                        uni.navigateTo({
                          url: "/pages/team/userTeams",
                        });
                      }
                    },
                  });
                }
              });
            } else if (res.cancel) {
            }
          },
        });
      }
    },
  },
  onShareAppMessage() {},
};
</script>
<style></style>
