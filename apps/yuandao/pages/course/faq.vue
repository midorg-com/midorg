<template>
  <view v-if="title" class="flex aic mg40 jcsb">
    <view class="fs36">章节：{{ title }}</view>
    <navigator url="/pages/course/lesson" class="fs28 mc fwb"
      >切换章节</navigator
    >
  </view>

  <view v-for="item in list" :key="item._id">
    <view class="card mg40">
      <view class="fs36 mgb10 mc"> 问题： </view>
      <view class="wba mgb20">{{ item.question }}</view>
      <view v-if="item.files && item.files[0]" class="mgb20">
        问题图示(点击查看大图)：
      </view>
      <view v-if="item.files && item.files[0]" class="flex fww">
        <view v-for="(file, index) in item.files" :key="index">
          <view class="tac pd8 bordereee">
            <image
              @click="preview(item.files, file.url)"
              :src="file.url"
              class="smallImg"
            ></image>
          </view>
        </view>
      </view>
      <view v-if="item.author">
        <view class="fs36 mgb20 mc">回答者：</view>
        <view class="wba mgb20">{{ item.author.name || item.author._id }}</view>
      </view>
      <view class="mgb10 fs36 mc">回答：</view>
      <view class="wba mgb20 lh17">
        <text user-select>{{ item.answer }}</text>
      </view>
      <view class="flex aic jcsa mgt20">
        <button
          :data-title="item.question"
          open-type="share"
          class="mc plainButton flex aic jcc"
        >
          <image
            src="/static/images/icon/share.png"
            class="likeIcon mgr10"
          ></image
          >分享
        </button>
        <button @click="like(item)" class="mc plainButton flex aic jcc">
          <image
            :src="
              item.liked
                ? '/static/images/icon/liked.png'
                : '/static/images/icon/like.png'
            "
            class="likeIcon mgr10"
          ></image
          >{{ item.likeCount || 0 }}
        </button>
      </view>
    </view>
  </view>
  <view class="mg40">没有自己的问题?点击下方</view>
  <view class="area">
    <navigator
      :url="'/pages/course/question?id=' + lessonId + '&title=' + title"
    >
      <button type="primary">去提问</button>
    </navigator>
  </view>
  <view class="mg40"
    >如果你在学习本章的过程中有遇到过一些问题自行解决了，该问题对于其他人同样有价值，并且此处没有的话可以点击下方按钮提交你的问题答疑，如被采纳将会奖励贡献、金币等</view
  >
  <view class="area">
    <navigator
      :url="
        '/pages/course/question?id=' +
        lessonId +
        '&faq=true' +
        '&title=' +
        title
      "
    >
      <button type="primary">去分享</button>
    </navigator>
  </view>
</template>

<script>
import cf from "../../utils/cf.js";
export default {
  data() {
    return {
      list: [],
      lessonId: "",
      title: "",
      loading: false,
    };
  },
  onLoad(e) {
    console.log(e);

    this.lessonId = e.id;
    this.title = e.title || "";
    cf(
      "getFaqs",
      {
        lessonId: e.id,
      },
      true
    ).then((res) => {
      this.list = res.data;
    });
  },
  onShareAppMessage(e) {
    return {
      title: e.from === "button" ? e.target.dataset.title : "常见问题",
    };
  },
  methods: {
    preview(files, url) {
      uni.previewImage({
        urls: files.map((item) => item.url),
        current: url,
      });
    },
    like(item) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      cf("updateLike", { target: item._id, type: "faq" }, true)
        .then((res) => {
          if (res.doc) {
            item.liked = !item.liked;
            item.likeCount = res.doc.likeCount;
            uni.showToast({
              title: item.liked ? "点赞成功" : "已取消",
              icon: item.liked && "success",
              mask: true,
            });
          } else {
            uni.showToast({
              title: "失败",
              icon: "error",
              mask: true,
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style></style>
