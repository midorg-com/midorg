<template>
  <view class="flex column aic mg40">
    <icon size="180rpx" class="mg40" type="success"></icon>
    <view class="lh17">
      <view class="fs36 mgb20">已提交申请，请继续执行以下步骤：</view>
      <view class="c3 mgb20"
        >1.
        长按最下方二维码添加康文昌微信，备注：小组长-组号-昵称。通过后将会进入小组长群；</view
      >
      <view class="c3 mgb20"
        >2.
        自行创建微信群聊，拉入康文昌，修改群名为：元岛-组号-组名。然后@康文昌
        通知创建完成，你的小组在审核后会公开出现在小组列表；</view
      >
      <view class="c3 mgb20"
        >3.
        对你的小组感兴趣的社员进入小组后会添加你的微信，将他们拉入小组群即可；</view
      >
      <view class="c3 mgb20"
        >4. 如果小组资料需要修改，在首页-我的小组-修改资料页面更改；</view
      >
      <view class="c3 mgb20"
        >5.
        该小组由你全权负责，请规范组员言行，遵守元岛公约，后续如果不想继续，可通知康文昌换人；</view
      >
    </view>
    <image
      show-menu-by-longpress
      class="img"
      mode="widthFix"
      src="/static/images/wx.jpg"
    ></image>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad(e) {},
  methods: {},
  onShareAppMessage() {},
};
</script>
<style></style>
