module.exports = async (args, db, userId, { env }) => {
  let appId = env.WX_APPID;
  let appSecret = env.WX_APPSECRET;
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
  let linkRes = await uniCloud.httpclient.request(
    `https://api.weixin.qq.com/wxa/generate_urllink?access_token=${at}`,
    {
      method: "POST",
      data: {
        path: "/pages/index/index",
        query: "?invite=" + userId,
        expire_type: 1,
        expire_interval: 30,
      },
      contentType: "json",
      dataType: "json",
    }
  );

  return linkRes.data;
};
