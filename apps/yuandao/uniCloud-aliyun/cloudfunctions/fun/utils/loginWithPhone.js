// 很多同学需要手机号登录的功能, 所以我也写一下
// 就两点不同, 一个是微信的接口是先获取ak, 再获取手机号, 前端的接口是按钮button 的getPhoneNumber看文档
// 第二就是额外加一个account 表, 用来存手机号及对应的userId
// 这是因为把手机号数据存到user 中返回给前端容易造成用户隐私泄露, 手机号按理来说只在登录时使用

let jwt = require("jsonwebtoken");

module.exports = async ({ code }, db, _, { env }) => {
  let appId = env.WX_APPID;
  let appSecret = env.WX_APPSECRET;
  if (!code) {
    throw Error("No code");
  }
  let atRes = await uniCloud.httpclient.request(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`,
    {
      dataType: "json",
    }
  );
  let at = atRes.data.access_token;
  if (!at) {
    throw Error("No access token");
  }
  let phoneRes = await uniCloud.httpclient.request(
    `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${at}`,
    {
      method: "POST",
      data: {
        code,
      },
      contentType: "json",
      dataType: "json",
    }
  );
  let { errcode, errmsg, phoneNumber, countrycode, watermark } =
    phoneRes.data.phone_info;
  if (errcode) {
    throw Error(errmsg);
  }
  if (!phoneNumber) {
    throw Error("没有手机号");
  }
  // 查询一下用户，有就返回
  let account = await db.collection("account").doc(phoneNumber).get();
  if (account.data[0]) {
    return {
      data:
        "Bearer " +
        jwt.sign(
          {
            userId: account.data[0].userId,
          },
          env.ADMIN_SECRET
        ),
    };
  }
  // 没有就新建一个
  let data = await db.collection("user").add({
    name: "", //名字
  });
  let userId = data.id;
  await db.collection("account").add({
    _id: phoneNumber,
    userId,
  });
  let token = jwt.sign(
    {
      userId: userId,
    },
    env.ADMIN_SECRET
  );

  return {
    data: "Bearer " + token,
  };
};
