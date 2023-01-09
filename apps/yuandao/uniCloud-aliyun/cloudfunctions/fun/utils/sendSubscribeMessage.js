module.exports = async (
  { title, content, type, note, page },
  db,
  userId,
  { env }
) => {
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
  let { data } = await db
    .collection("user")
    .doc(userId)
    .field({
      openId: true,
    })
    .get();
  let openId = data[0].openId;
  if (!openId) {
    return "no openId";
  }
  let time = new Date(Date.now() + 3600 * 8 * 1000);
  let msgRes = await uniCloud.httpclient.request(
    `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${at}`,
    {
      method: "POST",
      data: {
        touser: openId,
        template_id: "TMkdTWEhxtUmQebwBM6ew2dJXwNRsxAGspm3NxZRb28",
        page: page || "/pages/user/userHomework",
        data: {
          thing1: {
            value: (title || "标题").substring(0, 18),
          },
          thing2: {
            value: (content || "评论内容").substring(0, 18),
          },
          time3: {
            value: [time.getHours(), time.getMinutes()]
              .map((num) => `0${num}`.slice(-2))
              .join(":"),
          },
          thing7: {
            value: (type || "类型").substring(0, 18),
          },
          thing9: {
            value: (note || "备注").substring(0, 18),
          },
        },
      },
      contentType: "json",
      dataType: "json",
    }
  );
  if (msgRes.data.errCode) {
    throw Error(msgRes.data.errMsg);
  }
  return msgRes.data;
};
