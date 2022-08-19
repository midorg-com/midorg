// index.js
// const app = getApp()

Page({
  data: {
    path: "",
  },
  onLoad: function (e) {
    this.setData({
      path: e.path || "",
    });
  },
});
