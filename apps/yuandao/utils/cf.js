export default async function (api, args, withLoading) {
  try {
    if (withLoading) {
      uni.showLoading({});
    }
    let Authorization = uni.getStorageSync("token");
    if (!Authorization) {
      let { code } = await uni.login();
      let invite = uni.getStorageSync("invite");
      let login = await uniCloud.callFunction({
        name: "fun",
        data: {
          code,
          invite,
        },
      });
      if (login.result.token) {
        Authorization = login.result.token;
        uni.setStorageSync("token", login.result.token);
        uni.setStorageSync("user", login.result.user);
        if (api === "getUser") {
          return login.result.user;
        }
      } else {
        uni.showToast({
          title: "登录失败",
          icon: "error",
        });
        return;
      }
    }
    let res = await uniCloud.callFunction({
      name: "fun",
      data: {
        api,
        args,
        Authorization,
      },
    });

    let info = uni.getAccountInfoSync();
    if (info.miniProgram.envVersion !== "release") {
      console.log(res.result.data);
    }
    if (withLoading) {
      uni.hideLoading();
    }

    if (res.result.success === false) {
      console.error(res);
      uni.showModal({
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
      uni.hideLoading();
    }

    uni.showModal({
      title: "网络错误",
      content: e.message,
    });
    return false;
  }
}
