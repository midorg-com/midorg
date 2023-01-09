<template>
  <view>
    <view class="flex aic mg40 jcsb">
      <view class="fs36">章节：{{ title }}</view>
      <navigator
        :url="'/pages/course/experience?id=' + lessonId + '&title=' + title"
        class="fs28 mc fwb"
        >我也要分享</navigator
      >
    </view>

    <view v-for="(item, index) in list" :key="index">
      <view class="card mg40">
        <view class="fs36 mgb20 mc">标题：</view>
        <view class="wba mgb20">{{ item.title }}</view>
        <view v-if="item.author">
          <view class="fs36 mgb20 mc">作者：</view>
          <view class="wba mgb20">{{
            item.author.name || item.author._id
          }}</view>
        </view>
        <view class="fs36 mgb20 mc">正文：</view>
        <view class="wba mgb20"
          ><text user-select>{{ item.content || item.summary }}</text></view
        >
        <view class="flex aic jcsa mgt20">
          <button
            :data-title="item.title"
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
  </view>
</template>

<script>
import cf from "../../utils/cf.js";
export default {
  data() {
    return {
      list: [],
      item: {},
      title: "",
      lessonId: "",
    };
  },
  onLoad(e) {
    this.lessonId = e.id;
    this.title = e.title || "";
    cf(
      "getArticles",
      {
        lessonId: e.id,
      },
      true
    ).then((res) => {
      this.list = res.data;
    });
  },
  methods: {
    preview(files, url) {
      uni.previewImage({
        urls: files.map((item) => item.url),
        current: url,
      });
    },
    jump(url) {
      uni.navigateTo({ url: url });
    },
    like(item) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      cf("updateLike", { target: item._id, type: "article" }, true)
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
  onShareAppMessage(e) {
    return {
      title: e.from === "button" ? e.target.dataset.title : "常见问题",
    };
  },
};
</script>
<style></style>
