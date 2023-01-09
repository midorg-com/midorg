<template>
  <view class="card mg40">
    <view class="fs36 mgb20">分享你在学习本章时的学习经验、资料等:</view>
    <view class="mgb20">1. 确保分享简洁易懂不要搬运网络垃圾；</view>
    <view class="mgb20"
      >2.
      包括但不限于踩坑经历、搜索到的好资料、个人理解、扩展知识等，如被采纳将会奖励积分、金币等；</view
    >
  </view>
  <view class="card mg40">
    <form @submit="submit">
      <view v-if="title" class="fs36 mgb20"> 章节：{{ title }} </view>
      <view class="mgb20">
        <view class="fs36">标题：</view>
        <textarea maxlength="200" class="input h100" name="title"></textarea>
      </view>
      <view class="mgb20">
        <view class="fs36">经验：</view>
        <textarea
          maxlength="10000"
          class="input h400"
          name="content"
          placeholder="包括但不限于踩坑经历、搜索到的好资料、个人理解、扩展知识等"
        ></textarea>
      </view>
      <view class="mgb20">
        <view class="fs36">上传包含更多信息的图片（要清晰）：</view>
        <view class="flex aic fww">
          <view v-for="(item, index) in files" :key="index">
            <view class="tac pd8 bordereee">
              <image
                @click="preview(files, item.url)"
                :src="item.url"
                class="smallImg"
              ></image>
              <view @click="remove(index, item.url)" class="cr">移除</view>
            </view>
          </view>
        </view>
        <view @click="uploadImg" class="flex aic jcc upload mgt40 mgb40">
          <view class="addIcon">+</view>
        </view>
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
      files: [],
      lessonId: "",
      title: "",
      loading: false,
    };
  },
  onLoad(e) {
    this.lessonId = e.id;
    this.title = e.title;
  },
  methods: {
    submit(e) {
      let d = e.detail.value;
      if (!d.content || d.content.length < 50) {
        uni.showToast({
          title: "请填写50字以上",
          icon: "error",
          mask: true,
        });
        return;
      }
      if (this.loading) {
        return;
      }
      this.loading = true;
      cf("createArticle", {
        lessonId: this.lessonId,
        content: d.content,
        title: d.title,
        files: this.files,
      })
        .then((res) => {
          if (res) {
            uni.showModal({
              title: "提交成功",
              content: "等待采纳",
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
    uploadImg() {
      if (this.files.length > 10) {
        uni.showModal({
          title: "超出上限",
          content: "上传这么多图片干啥，储存要钱的",
        });
        return;
      }
      uniCloud
        .chooseAndUploadFile({
          type: "image",
          sizeType: ["compressed"],
        })
        .then((res) => {
          this.files.push(...res.tempFiles);
        })
        .catch((e) => {
          if (e.errMsg !== "chooseAndUploadFile:fail cancel") {
            console.error(e);
          }
        });
    },
    remove(index, url) {
      this.files.splice(index, 1);
      cf("deleteFile", { file: url });
    },
    preview(files, url) {
      uni.previewImage({
        urls: files.map((item) => item.url),
        current: url,
      });
    },
  },
  onShareAppMessage() {},
};
</script>
<style></style>
