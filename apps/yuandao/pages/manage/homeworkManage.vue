<template>
  <view class="card mg40 pd0">
    <view class="flex jcsb">
      <view
        class="flex column aic jcc f1"
        :class="{ tab: type === '批改中' }"
        @click="tab('批改中')"
      >
        <view>批改中</view>
      </view>
      <view
        class="flex column aic jcc f1"
        :class="{ tab: type === '待修改' }"
        @click="tab('待修改')"
      >
        <view>待修改</view>
      </view>
      <view
        class="flex column aic jcc f1"
        :class="{ tab: type === '已批改' }"
        @click="tab('已批改')"
      >
        <view>已批改</view>
      </view>
    </view>
  </view>
  <view v-for="(item, index) in list" :key="index">
    <view class="card mg40">
      <view class="fs36 mgb20">{{ item.title }}</view>
      <view class="mgb20">{{ item.user.name }}</view>
      <view class="flex jcsb mgb20">
        <view>等级：{{ item.user.codeLevel }}</view>
        <view>积分：{{ item.user.score }}</view>
        <view>金币：{{ item.user.coin }}</view>
        <view>贡献：{{ item.user.share }}</view>
      </view>
      <uni-dateformat
        :date="item.updatedAt"
        format="yyyy-MM-dd hh:mm"
        class="fs28 mgb20"
      ></uni-dateformat>
      <view class="mgb20 wba">备注：{{ item.note }}</view>
      <view class="mgb20">回复：{{ item.comment }}</view>
      <view class="mgb20 wba cr">{{ item.user.allLiked && "已全赞" }}</view>
      <view class="flex jcsb mgb20">
        <view class="mc">{{ item.status }}</view>
        <view>积分：{{ item.score }}</view>
        <view>金币：{{ item.coin }}</view>
        <view>贡献：{{ item.share }}</view>
      </view>
      <view class="flex aic fww">
        <view v-for="(file, index) in item.files" :key="index">
          <view class="tac pd8 bordereee">
            <image
              @click="preview(item.files, file.url)"
              :src="file.url"
              class="smallImg"
            ></image>
            <view @click="remove(file.url, item)" class="cr">X</view>
          </view>
        </view>
      </view>
      <view class="flex aic jcsa mgt40 mgb20"
        ><view @click="showPage(item)" class="fs28 mc fwb">批改</view></view
      >
    </view>
  </view>
  <page-container :show="show" @leave="show = false">
    <view class="mg40">
      <view @click="close" class="tar mc">关闭</view>
      <view v-if="homework.user && homework.user.allLiked" class="mgb20 wba cr"
        >已全赞社员</view
      >
      <view v-if="homework.score" class="mgb20 mgt20 wba cr fs24"
        >此作业已批改，当前为刷分奖励，注意与之前对照</view
      >
      <view v-if="homework.score" class="flex jcsb mgb20 fs24">
        <view class="mc">{{ homework.status }}</view>
        <view>已获积分:{{ homework.score }}</view>
        <view>已获金币:{{ homework.coin }}</view>
        <view>已获贡献:{{ homework.share }}</view>
      </view>

      <view class="flex jcsb aic mgt20">
        <!-- <view class="shrink0 mgr20">满分:</view>
        <view class="bordereee pd8 mgr10 mgla cr" @click="add('share', -1)"
          >清空</view
        >
        <switch checked></switch>
        <view class="bordereee pd8" @click="add('share', 1)">满分</view> -->
        <view class="shrink0 mgr20">贡献:</view>
        <view class="shareColor">{{ share }}</view>
        <view class="bordereee pd8 mgr10 mgla cr" @click="add('share', -1)"
          >-1</view
        >
        <view class="bordereee pd8" @click="add('share', 1)">+1</view>
      </view>
      <view class="flex jcsb aic mgt20">
        <view class="shrink0 mgr20">金币:</view>
        <view class="coinColor">{{ coin }}</view>
        <view class="bordereee pd8 mgr10 mgla cr" @click="add('coin', -1)"
          >-1</view
        >
        <view class="bordereee pd8 mgr10" @click="add('coin')">+1</view>
        <view class="bordereee pd8" @click="add('coin', 10)">+10</view>
      </view>
      <view class="flex jcsb aic mgt20">
        <view class="shrink0 mgr20">积分:</view>
        <view class="scoreColor">{{ score }}</view>
        <view class="bordereee pd8 mgr10 mgla cr" @click="add('score', -100)"
          >-100</view
        >
        <view class="bordereee pd8 mgr10" @click="add('score', 100)">+100</view>
        <view class="bordereee pd8" @click="add('score', 600)">+600</view>
      </view>
      <input class="smallInput" v-model="comment" placeholder="评价" />
      <view class="flex fww">
        <view
          v-if="homework.user && homework.user.name"
          class="bordereee mg10"
          @click="quick(homework.user.name)"
          >{{ homework.user.name }}</view
        >
        <view class="bordereee mg10" @click="quick('非常棒！')">非常棒！</view>
        <view class="bordereee mg10" @click="quick('很棒！')">很棒！</view>
        <view class="bordereee mg10" @click="quick('漂亮！')">漂亮！</view>
        <view class="bordereee mg10" @click="quick('继续加油！')">
          继续加油！
        </view>
        <view class="bordereee mg10" @click="quick('厉害！')">厉害！</view>
        <view class="bordereee mg10" @click="quick('坚持就是胜利！')">
          坚持就是胜利！
        </view>
        <view class="bordereee mg10" @click="quick('享受编程！')">
          享受编程！
        </view>
        <view class="bordereee mg10" @click="quick('完美！')">完美！</view>
        <view class="bordereee mg10" @click="quick('下次记得写作业哦')"
          >补作业...</view
        >
        <view
          class="bordereee mg10"
          @click="quick('很棒，给你通过了，下次记得投币和收藏哦')"
          >补币和藏...</view
        >
        <view
          class="bordereee mg10"
          @click="quick('很棒，给你通过了，下次记得把收藏补上哦')"
          >补收藏...</view
        >
        <view
          class="bordereee mg10"
          @click="quick('很棒，给你通过了，下次记得把币补上哦')"
        >
          补硬币...
        </view>
        <view
          class="bordereee mg10"
          @click="quick('很棒！但是要补充一下三连截图哈')"
        >
          补三连...
        </view>
        <view class="bordereee mg10 cr" @click="clear()"> 清空 </view>
      </view>
      <view class="flex aic jcc mgb40 mgt20">
        <button class="mg20" @tap="suggest">不通过</button>
        <button class="mg20" type="primary" @tap="pass">通过</button>
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
      homework: {},
      score: 0,
      share: 0,
      coin: 0,
      comment: "",
      type: "批改中",
    };
  },
  onLoad(options) {
    this.getHomeworks(this.type);
  },
  methods: {
    getHomeworks(type) {
      cf("getUncheckedHomeworks", { status: type }, true).then((res) => {
        this.list = res;
      });
    },
    tab(type) {
      this.type = type;
      this.getHomeworks(type);
    },
    suggest() {
      cf(
        "updateHomework",
        {
          uId: this.homework.userId,
          lessonId: this.homework.lessonId,
          comment: this.comment,
          status: "待修改",
        },
        true
      ).then((res) => {
        if (res) {
          this.show = false;
          this.list.splice(
            this.list.findIndex((item) => item._id === this.homework._id),
            1
          );
          uni.showToast({
            title: "",
            icon: "success",
          });
        }
      });
    },
    pass() {
      cf(
        "checkHomework",
        {
          uId: this.homework.userId,
          lessonId: this.homework.lessonId,
          comment: this.comment,
          score: this.score,
          coin: this.coin,
          share: this.share,
        },
        true
      ).then((res) => {
        if (res) {
          this.show = false;
          this.score = 0;
          this.coin = 0;
          this.share = 0;
          uni.showToast({
            title: "",
            icon: "success",
          });
          this.list.splice(
            this.list.findIndex((item) => item._id === this.homework._id),
            1
          );
        }
      });
    },
    showPage(item) {
      this.show = true;
      this.homework = item;
      console.log(item);
      if (item.user.allLiked && !item.checked) {
        this.share = 1;
        this.score = 600;
        this.coin = 10;
      }
    },
    close() {
      this.show = false;
    },
    quick(c) {
      this.comment = this.comment + c;
    },
    clear() {
      this.comment = "";
    },
    add(e, n) {
      switch (e) {
        case "coin":
          this.coin = this.coin + (n || 1);
          break;
        case "share":
          this.share = this.share + (n || 1);
          break;
        case "score":
          this.score = this.score + (n || 100);
          break;
        default:
          break;
      }
    },
    remove(url, item) {
      let fileIndex = item.files.findIndex((file) => file.url === url);
      item.files.splice(fileIndex, 1);

      cf(
        "updateHomework",
        {
          lessonId: item.lessonId,
          files: item.files,
          uId: item.userId,
        },
        true
      ).then((res) => {
        if (res) {
          uni.showToast({
            title: "",
            icon: "success",
          });
          cf("deleteFile", { file: url });
        }
      });
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
