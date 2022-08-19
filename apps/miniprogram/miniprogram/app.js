App({
  onLaunch: function () {
    // 只有很老的微信版本没有wx.cloud环境，因为我们的功能依赖这个，所以对没有的老版本跳转至更新页面
    if (!wx.cloud) {
      wx.updateWeChatApp({});
    } else {
      // 在开发和体验环境使用测试云环境
      let info = wx.getAccountInfoSync();
      wx.cloud.init({
        env:
          info.miniProgram.envVersion === "release"
            ? "mid-2gnw71li1e1341f3"
            : "test-1gx755x1a044799e",
        traceUser: true,
      });
    }
    // 立即更新版本，详见文档：https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/update-mechanism.html
    let updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {});
    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate();
    });
  },
  globalData: {}, // 全局数据，可在所有页面用getApp()访问到这个对象
});
