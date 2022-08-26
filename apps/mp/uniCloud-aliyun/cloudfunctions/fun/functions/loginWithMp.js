let jwt = require("jsonwebtoken");
module.exports = async (args, db, openId, ctx) => {
  let wxRes = await uniCloud.httpclient.request(
    `https://api.weixin.qq.com/sns/jscode2session?appid=${ctx.env.WX_APPID}&secret=${ctx.env.WX_APPSECRET}&js_code=${args.code}&grant_type=authorization_code`,
    {
      dataType: "json",
    }
  );
  let userId = wxRes.data.openid;
  if (!userId) {
    throw Error(wxRes.data.errmsg);
  }
  let user = await db.collection("user").doc(userId).get();
  let token =
    "Bearer " +
    jwt.sign(
      {
        userId,
      },
      ctx.env.ADMIN_SECRET
    );
  if (user.data[0]) {
    return {
      user: user.data[0],
      token,
    };
  } else {
    let data = {
      _id: userId,
      createdAt: Date.now(),
    };
    await db.collection("user").add(data);
    return {
      user: data,
      token,
    };
  }
};
