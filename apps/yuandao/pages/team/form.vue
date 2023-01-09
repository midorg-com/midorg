<template>
  <view class="mg40">
    <form @submit="submit">
      <view class="mgt40 mgb80">
        <view class="fs36">小组名：</view>
        <view class="fs24 wba"
          >小组名必须突出特点，比如某个技术-java学习，某个项目-论坛项目，某个兴趣-机器人技术，某个目标-今天你成为CTO了吗</view
        >
        <input
          maxlength="40"
          class="input"
          v-model="groupName"
          name="groupName"
        />
      </view>
      <view class="mgt40 mgb80">
        <view class="fs36">小组类型：</view>
        <radio-group class="mgt40" :value="type" name="type">
          <label>
            <radio :checked="true" value="兴趣" />
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
      <view class="mgt40 mgb80">
        <view class="fs36">进组审批：</view>
        <radio-group class="mgt40" name="approve">
          <label>
            <radio :checked="!approve" :value="false" />
            无需审批
          </label>
          <label>
            <radio :checked="approve" :value="true" />
            需要审批
          </label>
        </radio-group>
      </view>
      <view class="mgt40 mgb80">
        <view class="fs36">小组介绍：</view>
        <textarea
          maxlength="300"
          class="input h100"
          v-model="intro"
          name="intro"
          placeholder="20-300字"
        ></textarea>
      </view>
      <view class="mgt40 mgb80">
        <view class="fs36">限制项：</view>
        <checkbox-group class="mgt40" name="check" @change="checkChange">
          <label>
            <checkbox value="checkActivity" :checked="checkActivity" />
            高活跃度
          </label>
          <label>
            <checkbox value="checkLevel" :checked="checkLevel" />
            等级
          </label>
          <label>
            <checkbox value="checkAge" :checked="checkAge" />
            年龄
          </label>
        </checkbox-group>
      </view>
      <view v-if="checkLevel" class="mgt40 mgb80">
        <view class="fs36">等级：</view>
        <input
          maxlength="3"
          class="input"
          name="minLevel"
          v-model="minLevel"
          type="number"
          placeholder="要求至少该等级的用户才能加入，只写数字"
        />
      </view>
      <view v-if="checkAge" class="mgt40 mgb80">
        <view class="fs36">年龄：</view>
        <input
          maxlength="3"
          class="input"
          v-model="age"
          name="age"
          type="number"
          placeholder="只写数字，将会显示小3岁-大2岁的范围"
        />
      </view>
      <view v-if="teamId" class="mgt40 mgb80">
        <view class="fs36">联系方式：</view>
        <input
          class="input"
          v-model="wxNumber"
          name="wxNumber"
          placeholder="便于在二维码失效时使用"
        />
      </view>
      <view v-if="teamId" class="mgt40 mgb80">
        <view class="fs36">群二维码：</view>
        <image :src="wx" class="smallImg"></image>
        <view @click="uploadImg" class="flex aic jcc upload mgt40 mgb40">
          <view class="addIcon">+</view>
        </view>
      </view>
      <view class="area">
        <button style="margin: 30rpx 0" type="primary" formType="submit">
          提交
        </button>
        <button style="margin: 30rpx 0" formType="reset">重置</button>
      </view>
    </form>
  </view>
</template>

<script>
import cf from "./../../utils/cf.js";
export default {
  data() {
    return {
      loading: false,
      checkActivity: false,
      checkLevel: false,
      checkAge: false,
      approve: false,
      groupName: "",
      wx: "",
      wxNumber: "",
      type: "",
      intro: "",
      minLevel: "",
      age: "",
      teamId: "",
    };
  },
  onLoad: function (e) {
    if (e.team) {
      let team = JSON.parse(e.team);
      this.checkActivity = team.checkActivity;
      this.checkLevel = team.checkLevel;
      this.checkAge = team.checkAge;
      this.approve = team.approve;
      this.groupName = team.groupName;
      this.wx = team.wx;
      this.wxNumber = team.wxNumber;
      this.type = team.type;
      this.intro = team.intro;
      this.minLevel = team.minLevel;
      this.age = team.age;
      this.teamId = team._id;
      uni.setNavigationBarTitle({
        title: "修改资料",
      });
    }
  },
  methods: {
    submit: function (e) {
      let u = e.detail.value;
      let form = {
        groupName: u.groupName,
        wxNumber: u.wxNumber,
        wx: this.wx,
        intro: u.intro,
        type: u.type || "兴趣",
        approve: u.approve === "true",
        checkActivity: this.checkActivity,
        checkLevel: this.checkLevel,
        checkAge: this.checkAge,
        minLevel: parseInt(u.minLevel) || 1,
        age: parseInt(u.age) || 0,
        _id: this.teamId || undefined,
      };
      if (this.loading) {
        return;
      }

      if (!u.groupName) {
        uni.showToast({
          title: "请输入小组名",
          icon: "error",
        });
        return;
      }
      if (!u.type) {
        uni.showToast({
          title: "请选择小组类型",
          icon: "error",
        });
        return;
      }

      if (u.intro.length < 20) {
        uni.showToast({
          title: "介绍不少于20字",
          icon: "error",
        });
        return;
      }

      if (form.checkAge && form.age < 3) {
        uni.showToast({
          title: "请输入正确年龄",
          icon: "error",
        });
        return;
      }
      this.loading = true;

      cf(this.teamId ? "updateTeam" : "createTeamForm", form, true)
        .then((res) => {
          if (!res) {
            return;
          }

          if (this.teamId) {
            uni.showToast({
              title: "修改成功",
              icon: "success",
            });
            setTimeout(() => {
              uni.navigateBack({
                delta: 1,
              });
            }, 1000);
          } else {
            uni.redirectTo({
              url: "/pages/team/tip?teamId=" + String(res.id),
            });
          }
        })
        .finally(() => {
          // finally就是不管成功或失败都会执行，设置loading等待状态为false
          this.loading = false;
        });
    },
    checkChange: function (e) {
      let list = e.detail.value;
      this.checkActivity = list.includes("checkActivity");
      this.checkLevel = list.includes("checkLevel");
      this.checkAge = list.includes("checkAge");
      this.checkRegion = list.includes("checkRegion");
    },
    uploadImg() {
      uniCloud
        .chooseAndUploadFile({
          type: "image",
          sizeType: ["compressed"],
          sourceType: ["album"],
          count: 1,
        })
        .then((res) => {
          let url = res.tempFiles[0].url;
          let old = `${this.wx}`;
          this.wx = url;

          if (old) {
            cf("deleteFile", { file: old }).then(() => {});
          }
        })
        .catch((e) => {
          if (e.errMsg !== "chooseAndUploadFile:fail cancel") {
            console.error(e);
          }
        });
    },
  },
};
</script>
<style></style>
