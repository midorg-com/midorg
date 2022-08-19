import cf from "../../utils/cf";

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
    cf("getManyForm", { groupId: Number(e.groupId) || 1 }).then((res) => {
      this.setData({
        userList: res.userList,
        isLeader: res.isLeader,
      });
    });
  },
});
