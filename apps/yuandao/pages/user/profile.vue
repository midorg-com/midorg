<template>
  <view class="mg40">
    <view class="mgt40 mgb80">
      <view class="fs36 mgb20">元岛名：</view>
      <input
        type="nickname"
        :maxlength="20"
        class="input"
        name="name"
        v-model="name"
        placeholder="元岛名具有唯一性"
      />
      <view class="area"
        ><button @click="updateName()" type="primary">修改元岛名</button></view
      >
    </view>
    <form @submit="submit">
      <view class="mgt40 mgb80">
        <view class="fs36">个人网站：</view>
        <input
          :maxlength="100"
          class="input"
          name="site"
          v-model="site"
          placeholder="填写你的个人网站"
        />
      </view>
      <view class="mgt40 mgb80">
        <view class="fs36">B站昵称：</view>
        <input
          :maxlength="60"
          class="input"
          name="bilibili"
          v-model="bilibili"
          placeholder="为了眼熟……"
        />
      </view>
      <view class="mgt40 mgb80">
        <view class="fs36">抖音昵称：</view>
        <input
          :maxlength="60"
          class="input"
          name="dy"
          v-model="dy"
          placeholder="为了眼熟……"
        />
      </view>
      <view class="mgt40 mgb80">
        <view class="fs36">个性签名：</view>
        <textarea
          :maxlength="60"
          v-model="bio"
          class="input h100"
          name="bio"
          placeholder="60字内"
        ></textarea>
      </view>
      <view class="area"><button formType="submit">修改资料</button></view>
    </form>
  </view>
</template>

<script>
import cf from "../../utils/cf.js";
export default {
  data() {
    return {
      name: "",
      site: "",
      bio: "",
      bilibili: "",
      dy: "",
      loading: false,
    };
  },
  onLoad: function (e) {
    let user = uni.getStorageSync("user");
    this.name = user.name || "";
    this.site = user.site || "";
    this.bio = user.bio || "";
    this.bilibili = user.bilibili || "";
    this.dy = user.dy || "";
  },
  methods: {
    submit: function (e) {
      this.loading = true;
      cf(
        "updateUser",
        {
          bio: this.bio,
          site: this.site,
          bilibili: this.bilibili,
          dy: this.dy,
        },
        true
      )
        .then((res) => {
          if (res) {
            uni.showToast({
              title: "修改成功",
              icon: "success",
            });
            let user = uni.getStorageSync("user");
            user.bio = this.bio;
            user.site = this.site;
            user.bilibili = this.bilibili;
            user.dy = this.dy;
            uni.setStorageSync("user", user);
            setTimeout(() => {
              uni.navigateBack({
                delta: 1,
              });
            }, 1000);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    updateName: function (e) {
      let name = this.name;

      if (this.loading) {
        return;
      }

      if (!name) {
        uni.showToast({
          title: "昵称不可为空",
          icon: "error",
        });
        return;
      }

      this.loading = true;
      cf(
        "updateUserName",
        {
          name,
        },
        true
      )
        .then((res) => {
          if (res) {
            uni.showToast({
              title: "修改成功",
              icon: "success",
            });
            let user = uni.getStorageSync("user");
            user.name = name;
            uni.setStorageSync("user", user);
            setTimeout(() => {
              uni.navigateBack({
                delta: 1,
              });
            }, 1000);
          }
        })
        .finally(() => {
          this.loading = false;
          this.show = false;
        });
    },
  },
  onShareAppMessage() {},
};
</script>
<style></style>
