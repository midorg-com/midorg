Page({
  data: {
    userList: [],
    groupId: "",
    g: "1",
    c: "1",
    isLeader: false,
  },
  onLoad: function (e) {
    this.setData({
      groupId: e.groupId || "1",
      g: String(Math.ceil(Number(e.groupId) / 190) || "1"),
      c: String(Math.ceil(Number(e.groupId) / 30) || "1"),
    });
    wx.cloud
      .callFunction({
        name: "quickstartFunctions",
        data: {
          type: "getManyForm",
          data: {
            groupId: Number(e.groupId) || 1,
          },
        },
      })
      .then((res) => {
        this.setData({
          userList: res.result.userList,
          isLeader: res.result.isLeader,
        });
      });
  },
});
