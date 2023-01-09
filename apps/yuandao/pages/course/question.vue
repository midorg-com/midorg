<template>
  <view class="card mg40">
    <view class="fs36 mgb20">提问需知:</view>
    <view class="mgb20">1. 确保你的问题没有在常见问题列表中；</view>
    <view v-if="!faq" class="mgb20">2. 确保你的问题在视频中没有提到；</view>
    <view v-if="!faq" class="mgb20">
      3.
      请仔细检查每一个英文单词，确保每一个标点符号都是英文符号(这一点是新手80%的问题所在)；
    </view>
    <view v-if="!faq" class="mgb20">
      4. 按照下列格式填写，模糊不明的问题将不被回答和采纳；
    </view>
  </view>
  <view class="card mg40">
    <form @submit="submit">
      <view v-if="title" class="fs36 mgb20"> 章节：{{ title }} </view>
      <view class="mgb20">
        <view class="fs36">问题：</view>
        <textarea
          maxlength="200"
          class="input h100"
          name="question"
          placeholder="请详细描述你的问题，越详细越清晰将更可能被回复和采纳，无意义没有信息的问题无法回答，不被采纳。"
        ></textarea>
      </view>
      <view v-if="faq" class="mgb20">
        <view class="fs36">你的答案：</view>
        <textarea
          maxlength="3000"
          class="input h100"
          name="answer"
          placeholder="分享你解决问题的经验来帮助他人"
        ></textarea>
      </view>
      <view class="mgb20">
        <view class="fs36"
          >上传包含具体代码和报错信息(如有)的截图（要清晰）：</view
        >
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
      answer: "",
      faq: false,
      loading: false,
    };
  },
  onLoad(e) {
    this.lessonId = e.id;
    this.title = e.title;
    this.faq = Boolean(e.faq);
  },
  methods: {
    submit(e) {
      let d = e.detail.value;
      if (!d.question || d.question.length < 10) {
        uni.showToast({
          title: "请填写10字以上问题",
          icon: "error",
          mask: true,
        });
        return;
      }
      if (this.loading) {
        return;
      }
      this.loading = true;
      uni
        .requestSubscribeMessage({
          tmplIds: ["TMkdTWEhxtUmQebwBM6ew2dJXwNRsxAGspm3NxZRb28"],
        })
        .then((res) => {
          cf(
            "createQuestion",
            {
              lessonId: this.lessonId,
              files: this.files || [],
              subscribe: res,
              faq: this.faq,
              ...d,
            },
            true
          )
            .then((res) => {
              if (res) {
                uni.showModal({
                  title: "提交成功",
                  content: "请耐心等待回复，答复后会有消息通知",
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
