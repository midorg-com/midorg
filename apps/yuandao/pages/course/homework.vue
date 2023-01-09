<template>
  <view class="card mg40">
    <view class="flex aic jcsb mgb20">
      <view class="fs36">当前进度：{{ lesson.title }}</view>
      <view></view>
    </view>
    <view class="fs28 mgb20 flex">
      <view class="shrink0">作业：</view>
      <view class="wba"
        ><text user-select>{{ lesson.homework }}</text></view
      >
    </view>
    <view v-if="lesson.example" class="fs28 mgb20 flex">
      <view class="shrink0">示例：</view>
      <view class="wba"
        ><text user-select>{{ lesson.example }}</text></view
      >
    </view>
    <view class="fs28 mgb20 flex">
      <view class="shrink0">奖励：</view>
      <view class="f1 fww">
        <view v-if="lesson.score" class="flex jcsb">
          <view class="flex aic mc">
            <view>等级+</view>
            <view> {{ lesson.level }}</view>
          </view>
          <view v-if="lesson.share" class="flex aic shareColor">
            <view>贡献+</view>
            <view> {{ lesson.share }}</view>
          </view>
          <view class="flex aic scoreColor">
            <view>积分+</view>
            <view> {{ lesson.score }}</view>
          </view>
          <view class="flex aic coinColor">
            <view>金币+</view>
            <view> {{ lesson.coin }}</view>
          </view>
        </view>
        <view v-if="lesson.reward">{{ lesson.reward }}</view>
      </view>
    </view>
  </view>
  <view class="card mg40">
    <view class="flex aic jcsb mgb20">
      <view class="fs36">章节详情</view>
      <view></view>
    </view>
    <view class="fs28 mgb20 flex">
      <view class="shrink0">视频平台：</view>
      <view class="wba">{{ lesson.platform }}</view>
    </view>
    <view class="fs28 mgb20 flex">
      <view class="shrink0">复制地址：</view>
      <view class="wba">
        <text @click="setClipboardData(lesson.url)" user-select>{{
          lesson.url
        }}</text>
      </view>
    </view>
    <view class="fs28 flex mgb20">
      <text class="shrink0">作业形式：</text>
      <view class="wba">{{ lesson.required }}</view>
    </view>
    <view class="fs28 flex mgb20">
      <text class="shrink0">查看解释：</text>
      <navigator
        url="/pages/course/faq?id=midorg&title=为什么交作业需要你点赞截图"
        class="wba mc"
        >为什么交作业需要你点赞截图</navigator
      >
    </view>
    <view class="fs28 flex mgb20">
      <text class="shrink0">跳过作业：</text>
      <navigator url="/pages/community/contribution" class="wba"
        >支持畅行卡解锁问答资源</navigator
      >
    </view>
    <view class="fs28 flex mgb20">
      <text class="shrink0">进阶奖励：</text>
      <view class="wba">{{ lesson.advanced }}</view>
    </view>
    <view class="fs28 flex mgb20">
      <text class="shrink0">优质奖励：</text>
      <view class="wba">优质作业将会收到额外奖励哦~</view>
    </view>
    <view v-if="lesson.comment" class="fs28 flex mgb20">
      <text class="shrink0">作业回复：</text>
      <view class="wba">{{ lesson.comment }}</view>
    </view>
  </view>
  <view class="mg40 fs36">上传作业（要清晰）：</view>
  <view class="card mg40">
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
    <input
      class="input"
      v-model="note"
      placeholder="如有其他信息可以备注在此"
    />
    <!-- 此处不能用textarea只能用input，iOS端有bug -->
  </view>
  <view class="area">
    <button type="primary" @click="submit">提交</button>
  </view>
</template>

<script>
import cf from "../../utils/cf.js";
export default {
  data() {
    return {
      lesson: {},
      files: [],
      update: false,
      loading: false,
      note: "",
    };
  },
  methods: {
    submit() {
      if (this.files.length === 0) {
        uni.showToast({
          title: "请提交作业截图",
          icon: "error",
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
            "createHomework",
            {
              files: this.files,
              lessonId: this.lesson.lessonId,
              subscribe: res,
              note: this.note,
            },
            true
          )
            .then((data) => {
              if (data) {
                uni.showModal({
                  title: "提交成功",
                  content: "请耐心等待，批改后会有消息通知",
                  showCancel: false,
                  success: ({ confirm, cancel }) => {
                    uni.navigateBack({
                      delta: 1,
                    });
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
      cf("deleteFile", {
        file: url,
      });
    },
    preview(files, url) {
      uni.previewImage({
        urls: files.map((item) => item.url),
        current: url,
      });
    },
    setClipboardData(d) {
      uni.setClipboardData({
        data: d,
        success: function () {},
      });
    },
  },
  onLoad(e) {
    if (e.id) {
      cf(
        "getHomework",
        {
          lessonId: e.id,
        },
        true
      ).then((res) => {
        this.lesson = res;
        this.files = res.files || [];
        this.update = res.update;
        this.note = res.note;
      });
    } else {
      uni.showModal({
        title: "无对应课程",
        content: "如有错误请联系管理员",
        success(r) {
          if (r.confirm) {
            uni.redirectTo({
              url: "/pages/index/qrcode",
            });
          }
        },
      });
    }
  },
  onShareAppMessage() {},
};
</script>

<style></style>
