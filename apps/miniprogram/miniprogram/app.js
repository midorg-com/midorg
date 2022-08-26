App({
  onLaunch: function () {
    // 立即更新版本，详见文档：https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/update-mechanism.html
    let updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {});
    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate();
    });
  },
  globalData: {}, // 全局数据，可在所有页面用getApp()访问到这个对象
});
