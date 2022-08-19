import cf from "../../utils/cf";

Page({
  data: {
    groupList: [],
  },
  onLoad: function (e) {
    cf("getManyGroup", {}, true).then((res) => {
      this.setData({
        groupList: res.groupList,
      });
    });
  },
});
