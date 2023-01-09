<script>
export default {
  onLaunch: function () {
    let updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {});
    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate();
    });
  },
  globalData: {},
};
</script>

<style>
/* 统一设置页面背景色为灰色 */
page {
  background-color: #eeeeee;
  letter-spacing: 1rpx;
  padding-bottom: 20rpx;
}
button {
  width: 360rpx;
}
/* flex常用css */
.flex {
  display: flex;
}

.column {
  flex-direction: column;
}

.f1 {
  flex: 1;
}

.jcc {
  justify-content: center;
}

.aic {
  align-items: center;
}

.jcsb {
  justify-content: space-between;
}

.jcsa {
  justify-content: space-around;
}

.fww {
  flex-wrap: wrap;
}
.shrink0 {
  flex-shrink: 0;
}
/* 颜色常用css */
.mc {
  color: #8ba3c7;
}

.mbc {
  background-color: #8ba3c7;
}

.gbc {
  background-color: #07c160;
}
.gc {
  color: #60cf95;
}
.cr {
  color: rgb(253, 91, 91);
}

.cf {
  color: #fff;
}

.shareColor {
  color: #ff7878;
}

.coinColor {
  color: #ffd88a;
}

.scoreColor {
  color: #f7baba;
}

.c0 {
  color: #000000;
}

.c3 {
  color: #333;
}

.ce {
  color: #eee;
}

.c5 {
  color: #555;
}

.c6 {
  color: #666;
}

.c8 {
  color: #888;
}

.c9 {
  color: #999;
}

/* 间距常用CSS */
.pd0 {
  padding: 0px !important;
}
.pd8 {
  padding: 8px;
}
.pd20 {
  padding: 20rpx;
}

.pd40 {
  padding: 40rpx;
}

.ma {
  margin-left: auto;
  margin-right: auto;
}

.mg10 {
  margin: 10rpx;
}

.mg20 {
  margin: 20rpx;
}

.mg40 {
  margin: 40rpx;
}

.mg60 {
  margin: 60rpx;
}

.mg80 {
  margin: 80rpx;
}

.mg100 {
  margin: 100rpx;
}

.mgt10 {
  margin-top: 10rpx;
}

.mgt20 {
  margin-top: 20rpx;
}

.mgt40 {
  margin-top: 40rpx;
}

.mgt80 {
  margin-top: 80rpx;
}

.mgb10 {
  margin-bottom: 10rpx;
}

.mgb20 {
  margin-bottom: 20rpx;
}

.mgb40 {
  margin-bottom: 40rpx;
}

.mgb80 {
  margin-bottom: 80rpx;
}

.mgl20 {
  margin-left: 20rpx;
}

.mgr20 {
  margin-right: 20rpx;
}
.mgr10 {
  margin-right: 10rpx;
}
.mgla {
  margin-left: auto;
}
.h100 {
  height: 100rpx;
}
.h400 {
  height: 400rpx;
}
.w100 {
  width: 100%;
}
.w150 {
  width: 150rpx;
}
/* 字体常用CSS */
.fwb {
  font-weight: bold;
}

.fs24 {
  font-size: 24rpx;
}

.fs28 {
  font-size: 28rpx;
}

.fs32 {
  font-size: 32rpx;
}

.fs36 {
  font-size: 36rpx;
}

.fs40 {
  font-size: 40rpx;
}

.fs44 {
  font-size: 44rpx;
}

.fs60 {
  font-size: 60rpx;
}

.tac {
  text-align: center;
}

.tar {
  text-align: right;
}

.wba {
  word-break: break-all;
}

.lh17 {
  line-height: 1.7;
}
.text-justify-none {
  text-justify: none;
}
/* 组件常用css */
.br {
  border-radius: 4rpx;
}

.card {
  border-radius: 4rpx;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
  background-color: #ffffff;
  padding: 40rpx;
  text-align: justify;
  color: #333;
  line-height: 1.5;
}

.colorCard {
  background: linear-gradient(
    135deg,
    rgba(139, 163, 199, 0.8),
    rgb(139, 163, 199)
  );
  color: #ffffff;
}

.blackCard {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgb(0, 0, 0));
  color: #ffffff;
}

.hr {
  margin: 10rpx 0;
  border-top: 1px solid #ccc;
}

.link {
  color: #216cd3;
  text-decoration: none;
  border-bottom: 1px dashed;
}

.placeholder {
  height: 160rpx;
}

.img {
  width: 500rpx;
  margin: 20rpx auto;
}

.section {
  margin: 40rpx 0 80rpx;
}

.input {
  margin: 30rpx 0;
  border-bottom: 1px solid #666;
  padding: 20rpx 0;
  width: 100%;
}
.smallInput {
  margin: 10rpx 0;
  border-bottom: 1px solid #666;
  padding: 10rpx 0;
  width: 100%;
}
.icon {
  width: 80rpx;
  height: 80rpx;
}

.arrow {
  width: 32rpx;
  height: 32rpx;
}
.likeIcon {
  width: 50rpx;
  height: 50rpx;
}
.area {
  margin: 100rpx auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.tag {
  padding: 4rpx 20rpx 6rpx;
  border-radius: 30rpx;
  background-color: #07c160;
  color: #fff;
  margin-right: 12rpx;
  margin-bottom: 12rpx;
  font-size: 24rpx;
}
.bordereee {
  border: 1px solid #eee;
}
.smallImg {
  width: 140rpx;
  height: 140rpx;
}
.upload {
  font-size: 100rpx;
  height: 100rpx;
  width: 100rpx;
  border: 1px solid #ccc;
  padding: 20rpx;
  color: #999;
}
.addIcon {
  margin-top: -10rpx;
}
.tab {
  border-bottom: 2px solid #8ba3c7;
  padding: 20rpx 0 18rpx;
}
.tabbar {
  margin: -40rpx -40rpx 0;
  border-bottom: 1px solid #ccc;
}
.plainButton {
  background: none;
  font-size: 32rpx;
}
.plainButton::after {
  border: none;
}
</style>
