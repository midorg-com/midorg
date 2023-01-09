<template>
  <view v-for="(item, index) in list" :key="index">
    <view class="card mg40">
      <view class="fs36 mgb20">章节：</view>
      <view class="mgb20"> {{ item.lessonId }}</view>
      <view class="fs36 mgb20">问题：</view>
      <view class="mgb20"> {{ item.question }}</view>
      <view class="fs36 mgb20">时间：</view>
      <uni-dateformat
        :date="item.createdAt"
        format="yyyy-MM-dd hh:mm"
        class="mgb20"
      ></uni-dateformat>
      <view class="fs36 mgb20 mgt20">图片：</view>
      <view class="flex aic fww">
        <view v-for="(file, index) in item.files" :key="index">
          <view class="tac pd8 bordereee">
            <image
              @click="preview(item.files, file.url)"
              :src="file.url"
              class="smallImg"
            ></image>
            <view @click="remove(file.url, item)" class="cr">移除</view>
          </view>
        </view>
      </view>
      <view class="fs36 mgb20 mgt20">回复：</view>
      <view class="mgb20">{{ item.answer }}</view>
      <view class="flex aic jcsa mgt40 mgb20">
        <view @click="showPage(item)" class="fs28 mc fwb">处理</view>
      </view>
    </view>
  </view>
  <page-container :show="show" @leave="show = false">
    <view class="mg40">
      <view @click="show = false" class="tar mc">关闭</view>
      <input
        class="smallInput"
        v-model="question.lessonId"
        placeholder="章节"
      />
      <textarea
        maxlength="500"
        class="smallInput h100"
        v-model="question.question"
        placeholder="问题"
      ></textarea>
      <textarea
        maxlength="-1"
        class="smallInput h100"
        v-model="question.answer"
        placeholder="回答"
      ></textarea>
      <view class="flex aic fww">
        <view v-for="(item, index) in question.files" :key="index">
          <view class="tac pd8 bordereee">
            <image
              @click="preview(question.files, item.url)"
              :src="item.url"
              class="smallImg"
            ></image>
            <view @click="remove(item.url, question)" class="cr">移除</view>
          </view>
        </view>
      </view>
      <view
        @click="uploadImg(question)"
        class="flex aic jcc upload mgt10 mgb10"
      >
        <view class="addIcon">+</view>
      </view>
      <input class="smallInput" v-model="sort" placeholder="排序" />
      <view class="mg40 flex aic">
        <button class="mg20" @tap="suggest">回复</button>
        <button type="primary" @tap="pass">采纳</button>
      </view>
    </view>
  </page-container>
</template>

<script>
import cf from "../../utils/cf.js";

export default {
  data() {
    return {
      list: [],
      show: false,
      question: {},
      sort: 10,
    };
  },
  onLoad(options) {
    cf("getQuestions", {}, true).then((res) => {
      this.list = res.data;
    });
  },
  methods: {
    suggest() {
      cf(
        "updateQuestion",
        {
          ...this.question,
          adopted: false,
        },
        true
      ).then((res) => {
        if (res) {
          this.show = false;
          uni.showToast({
            title: "",
            icon: "success",
          });
          this.list.splice(
            this.list.findIndex((item) => item._id === this.question._id),
            1
          );
        }
      });
    },
    pass() {
      cf("updateQuestion", {
        ...this.question,
        adopted: true,
      });
      cf(
        "createFaq",
        {
          ...this.question,
          sort: parseInt(this.sort),
        },
        true
      ).then((res) => {
        if (res) {
          this.show = false;
          uni.showToast({
            title: "",
            icon: "success",
          });
          this.list.splice(
            this.list.findIndex((item) => item._id === this.question._id),
            1
          );
        }
      });
    },
    showPage(item) {
      this.show = true;
      this.question = item;
    },
    remove(url, item) {
      let fileIndex = item.files.findIndex((file) => file.url === url);
      item.files.splice(fileIndex, 1);
      cf("deleteFile", { file: url });
    },
    preview(files, url) {
      uni.previewImage({
        urls: files.map((item) => item.url),
        current: url,
      });
    },
    uploadImg(item) {
      uniCloud
        .chooseAndUploadFile({
          type: "image",
          sizeType: ["compressed"],
        })
        .then((res) => {
          item.files.push(...res.tempFiles);
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
