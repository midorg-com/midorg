<template>
  <view class="card mg40">
    <form @submit="submit">
      <view class="mgb20">
        <view class="fs36">章节ID：</view>
        <textarea
          maxlength="200"
          class="input h100"
          name="lessonId"
          placeholder="ID"
        ></textarea>
      </view>
      <view class="mgb20">
        <view class="fs36">问题：</view>
        <textarea
          maxlength="200"
          class="input h100"
          name="question"
          placeholder="你是如何遇到该问题的"
        ></textarea>
      </view>
      <view class="mgb20">
        <view class="fs36">上传全面的截图（不要拍照）：</view>
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
      <view class="mgb20">
        <view class="fs36">回答：</view>
        <textarea
          maxlength="-1"
          class="input h100"
          name="answer"
          placeholder="回答"
        ></textarea>
      </view>
      <view class="mgb20">
        <view class="fs36">排序：</view>
        <input name="sort" class="input" />
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
    };
  },
  methods: {
    submit(e) {
      let d = e.detail.value;
      cf("createFaq", {
        ...d,
        files: this.files || [],
        sort: parseInt(d.sort),
      }).then((res) => {
        if (res) {
          uni.showModal({
            title: "提交成功",
            content: "",
            showCancel: false,
            success: ({ confirm, cancel }) => {},
          });
        }
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
          sourceType: ["album"],
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
        urls: files,
        current: url,
      });
    },
  },
  onShareAppMessage() {},
};
</script>
<style></style>
