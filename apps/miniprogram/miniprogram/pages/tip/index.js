Page({
  data: {
    groupId: "",
    code: "",
    type: "",
    img: "1",
    g: "1",
  },
  onLoad(e) {
    this.setData({
      groupId: e.groupId || "",
      code: e.code || "",
      img: String(Math.ceil(Number(e.groupId) / 30) || "1"),
      g: String(Math.ceil(Number(e.groupId) / 190) || "1"),
      type: e.type || "",
    });
  },
});
