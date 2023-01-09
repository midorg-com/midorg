<template>
  <view v-if="items.length">
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
      <navigator class="mc" url="/pages/course/faq?id=shop-re01&title=课程支持"
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
      <view>数量:</view>
      <input class="input" v-model="count" type="number" />
      <view
        >总价: <text class="mc fwb">{{ (sku.total * count) / 100 }}</text></view
      >
      <view class="area">
        <button type="primary" @click="buy">确认</button>
      </view>
    </view>
  </page-container>
  <view class="fs36 mg40">元岛的建设者们:</view>
  <view v-for="(item, index) in list" :key="index">
    <view class="card mg40">
      <view class="fs36 mgb20">{{ item.user.name || "无昵称" }}</view>
      <view class="mgb20 flex aic fs28">
        <view>时间：</view>
        <uni-dateformat
          :date="item.confirmedAt"
          format="yyyy-MM-dd hh:mm"
        ></uni-dateformat>
      </view>
      <view class="mgt20"
        >支持项：{{ item.skuData.title }}<text> x{{ item.count }}</text></view
      >
    </view>
  </view>
  <view class="area c6">仅显示最新的100条数据</view>
</template>

<script>
import cf from "../../utils/cf.js";

export default {
  data() {
    return {
      list: [],
      end: false,
      items: [],
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
    this.getList();
    cf("getSkus", { course: e.course || "从零开始的编程之路" }).then((res) => {
      this.items = res.data || [];
    });
  },
  methods: {
    getList(skip) {
      cf("getOrders", { skip }, true).then((res) => {
        this.list.push(res.data || []);
        if (res.data.length < 100) {
          this.end = true;
        }
      });
    },
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
  onReachBottom() {
    // if (!this.end) {
    //   this.getList(this.list.length);
    // }
  },
};
</script>
<style></style>
