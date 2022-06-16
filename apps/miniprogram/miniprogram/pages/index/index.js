Page({
  data: {
    groupId: "",
  },
  onLoad: function (params) {
    let groupId = wx.getStorageSync("groupId");
    if (groupId) {
      this.setData({
        groupId: groupId,
      });
    } else {
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          data: {
            type: "getMyGroup",
          },
        })
        .then((res) => {
          if (res.result?.groupId) {
            wx.setStorageSync("groupId", res.result.groupId);
            this.setData({
              groupId: res.result.groupId,
            });
          }
        });
    }
  },
  onShow: function (params) {
    let groupId = wx.getStorageSync("groupId");
    if (groupId) {
      this.setData({
        groupId: groupId,
      });
    }
  },
});
