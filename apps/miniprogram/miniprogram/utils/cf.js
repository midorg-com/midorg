export default async function (api, args, withLoading) {
  try {
    if (withLoading) {
      wx.showLoading({});
    }
    let res = await wx.cloud.callFunction({
      name: "fun",
      data: {
        api,
        args,
      },
    });
    // 开发环境下打印所有请求数据
    let info = wx.getAccountInfoSync();
    if (info.miniProgram.envVersion !== "release") {
      console.log(res.result.data);
    }
    if (withLoading) {
      wx.hideLoading();
    }
    if (res.result.success === false) {
      console.error(res);
      wx.showModal({
        title: "请求错误",
        content: res.result.errorMessage,
      });
      return false;
    } else {
      return res.result.data;
    }
  } catch (e) {
    console.error(e);
    if (withLoading) {
      wx.hideLoading();
    }
    wx.showModal({
      title: "网络错误",
      content: e.message,
    });
    return false;
  }
}
