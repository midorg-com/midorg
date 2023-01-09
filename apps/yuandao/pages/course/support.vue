<template>
  <view>
    <view class="mg40 fs36">元岛支持项目:</view>
    <view v-for="item in list" :key="item._id">
      <view class="card mg40">
        <view class="fs36 mgb20">{{ item.title }}</view>
        <view class="mgb10">
          {{ item.description }}
        </view>
        <view class="mc">服务价格: {{ item.total / 100 }}</view>
        <button @click="open(item)" class="mgt40" type="primary">支持</button>
      </view>
    </view>
    <view class="area">
      <navigator
        class="mc"
        url="/pages/course/faq?id=shop-re01&title=课程支持问题"
        >常见问题</navigator
      >
    </view>
  </view>
  <page-container :show="show" @leave="show = false">
    <view class="mg40">
      <view @click="show = false" class="tar mc">关闭</view>
      <view>手机号:</view>
      <input class="input" v-model="info.phone" placeholder="" />
      <view>昵称:</view>
      <input class="input" v-model="info.name" placeholder="飞书或阿里云昵称" />
      <view>地址:</view>
      <input
        class="input"
        v-model="info.address"
        placeholder="部分支持项选填"
      />

      <view
        >总价: <text class="mc fwb">{{ sku.total / 100 }}</text></view
      >
      <view class="area">
        <button type="primary" @click="buy">确认</button>
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
      loading: false,
      sku: {},
      count: 1,
      info: {
        email: "",
        address: "",
        name: "",
        phone: "",
      },
    };
  },
  onLoad(e) {
    cf("getSkus", { course: e.course || "从零开始的编程之路" }, true).then(
      (res) => {
        this.list = res.data;
      }
    );
  },
  methods: {
    open(sku) {
      this.show = true;
      this.sku = sku;
    },
    buy() {
      if (this.loading) {
        return;
      }
      if (this.count === 0) {
        uni.showToast({
          title: "数量不能为0",
          icon: "error",
        });
        return;
      }
      if (this.sku.total * this.count > 1000000) {
        uni.showToast({
          title: "不能超出1万",
          icon: "error",
        });
        return;
      }
      cf("requestPayment", {
        skuId: this.sku._id,
        count: this.count,
        info: this.info,
      }).then((res) => {
        uni
          .requestPayment({
            ...res,
          })
          .then(({ errMsg }) => {
            if (errMsg === "requestPayment:ok") {
              uni.showModal({
                title: "支付成功",
                content: "感谢支持, 可在 我的 页面查看订单和权益",
              });
            } else {
              uni.showModal({
                title: "支付失败,请联系服务人员",
                content: errMsg,
              });
            }
          })
          .catch((e) => {
            console.error(e);
            uni.showModal({
              title: "支付失败,请联系服务人员",
              content: e.message,
            });
          })
          .finally(() => {
            this.show = false;
            this.loading = false;
          });
      });
    },
  },
  onShareAppMessage() {},
};
</script>
<style></style>
