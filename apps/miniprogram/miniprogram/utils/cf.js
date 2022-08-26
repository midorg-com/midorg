export default async function (api, args, withLoading) {
  try {
    if (withLoading) {
      wx.showLoading({});
    }
    let token = wx.getStorageSync("token");
    if (!token) {
      let { code } = await wx.login();
      let login = await new Promise((resolve, reject) => {
        wx.request({
          url: "https://你的函数URL地址",
          data: {
            api: "loginWithMp",
            args: {
              code,
            },
          },
          method: "POST",
          success: (res) => {
            resolve(res.data);
          },
          fail: (res) => {
            reject(res.errMsg);
          },
        });
      });
      if (login.data.token) {
        token = login.data.token;
        wx.setStorageSync("token", token);
      }
    }
    let res = await new Promise((resolve, reject) => {
      wx.request({
        url: "https://你的函数URL地址",
        data: {
          api,
          args,
          token,
        },
        method: "POST",
        success: (res) => {
          resolve(res.data);
        },
        fail: (res) => {
          reject(res.errMsg);
        },
      });
    });
    // 开发环境下打印所有请求数据
    let info = wx.getAccountInfoSync();
    if (info.miniProgram.envVersion !== "release") {
      console.log(res.data);
    }
    if (withLoading) {
      wx.hideLoading();
    }
    if (res.success === false) {
      console.error(res);
      wx.showModal({
        title: "请求错误",
        content: res.errorMessage,
      });
      return false;
    } else {
      return res.data;
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
