let jwt = require("jsonwebtoken");
let lessons = require("../lessons/code.js");
let firstId = "re01-001-001";
let lesson = lessons[firstId];
module.exports = async ({ code, invite }, db, env) => {
  let _ = db.command;
  let appId = env.WX_APPID;
  let appSecret = env.WX_APPSECRET;
  if (!code) {
    throw Error("No code");
  }
  let wxRes = await uniCloud.httpclient.request(
    `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`,
    {
      dataType: "json",
    }
  );
  let openId = wxRes.data.openid;
  let userId = wxRes.data.unionid; // 因为元岛绑定了微信开放平台，所以会返回unionid，没有绑定的要使用openid。
  if (!userId) {
    throw Error(wxRes.data.errmsg);
  }
  // 查询一下用户，有就返回
  let user = await db.collection("user").doc(userId).get();
  if (user.data[0]) {
    if (!user.data[0].openId) {
      await db.collection("user").doc(userId).update({
        openId,
      });
      user.data[0].openId = openId;
    }
    let lessonId = user.data[0].lesson.lessonId;
    user.data[0].lesson = lessons[lessonId] || { lessonId };
    return {
      user: user.data[0],
      token:
        "Bearer " +
        jwt.sign(
          {
            userId: user.data[0]._id,
          },
          env.ADMIN_SECRET
        ),
    };
  }
  if (userId === invite) {
    invite = "";
  }
  // 没有就新建一个
  let data = {
    _id: userId,
    openId,
    name: "", //名字
    bio: "", // 简介
    site: "", // 个人网站
    avatar: "", // 头像
    invite: invite || "",
    createdAt: Date.now(), // 注册时间
    ban: false, // 封禁用户
    codeLevel: 0, // 编程课等级
    totalLevel: 0, // 总等级
    share: 2, // 贡献
    totalShare: 2, // 总贡献
    coin: 0, // 金币
    totalCoin: 0, // 总金币
    score: 0, // 积分
    totalScore: 0, // 总积分
    roles: [], // 角色
    notifications: [], // 通知消息
    lesson: {
      lessonId: firstId,
    }, // 当前课程
  };
  await db.collection("user").add(data);

  let token = jwt.sign(
    {
      userId: userId,
    },
    env.ADMIN_SECRET
  );
  data.lesson = {
    lessonId: firstId,
    ...lesson,
  };
  return {
    user: data,
    token: "Bearer " + token,
  };
};
