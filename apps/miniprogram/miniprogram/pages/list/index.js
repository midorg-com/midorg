Page({
  data: {
    groupList: [],
  },
  onLoad: function (e) {
    wx.cloud
      .callFunction({
        name: "fun",
        data: {
          api: "getManyGroup",
        },
      })
      .then((res) => {
        this.setData({
          groupList: res.result.groupList,
        });
      });
  },
});
