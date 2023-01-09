<template>
  <view class="card mg40">
    <view class="fs36 mgb20">申请需知:</view>
    <view class="mgb20">1. 请描述你的真实信息；</view>
    <view v-if="!faq" class="mgb20"
      >2. 现阶段奖学金不会以现金模式发放, 而是实物电脑；</view
    >
    <view v-if="!faq" class="mgb20">
      3. 请描述你为什么需要和将用它达成什么效果；
    </view>
    <view v-if="!faq" class="mgb20"> 4. 请描述你的学习历程； </view>
  </view>
  <view class="card mg40">
    <form @submit="submit">
      <view class="mgb20">
        <view class="fs36">申请：</view>
        <textarea
          maxlength="8000"
          class="input"
          style="height: 400rpx"
          name="apply"
          placeholder="请在此处填写。"
        ></textarea>
      </view>
      <view class="area">
        <button type="primary" formType="submit">提交</button>
      </view>
    </form>
  </view>
</template>

<script>
import cf from "../../utils/cf.js";
export default {
  data() {
    return {
      loading: false,
    };
  },
  onLoad(e) {},
  methods: {
    submit(e) {
      let d = e.detail.value;
      if (!d.apply || d.apply.length < 100) {
        uni.showToast({
          title: "请填写100字以上",
          icon: "error",
          mask: true,
        });
        return;
      }
      if (this.loading) {
        return;
      }
      this.loading = true;
      cf(
        "createScholarshipApply",
        {
          ...d,
        },
        true
      )
        .then((res) => {
          if (res) {
            uni.showModal({
              title: "提交成功",
              content: "如申请通过, 将会联系你",
              showCancel: false,
              success: ({ confirm, cancel }) => {
                uni.navigateBack({ delta: 1 });
              },
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  onShareAppMessage() {},
};
</script>
<style></style>
