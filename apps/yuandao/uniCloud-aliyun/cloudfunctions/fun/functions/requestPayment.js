const unipay = require("uni-pay");
module.exports = async (args, db, userId, { env }) => {
  let user = await db
    .collection("user")
    .doc(userId)
    .field({
      openId: true,
    })
    .get();
  let openId = user.data[0].openId;
  let sku = await db.collection("sku").doc(args.skuId).get();
  let skuData = sku.data[0];
  if (!skuData) {
    throw Error("无商品");
  }
  let count = parseInt(args.count) || 1;
  let total = skuData.total * count;
  let order = await db.collection("order").add({
    skuData,
    createdAt: Date.now(),
    userId,
    ...args,
    total,
    count,
  });

  let appId = env.WX_APPID;
  let mchId = env.WX_MCHID;
  let payUrl = env.WX_PAYURL;
  let key = env.WX_PARTERNER_KEY;
  const unipayIns = unipay.initWeixin({
    appId,
    mchId,
    key,
  });
  let title = skuData.title + " x" + String(count);
  return await unipayIns.getOrderInfo({
    openid: openId,
    subject: title,
    body: title,
    outTradeNo: order.id,
    totalFee: total,
    notifyUrl: payUrl + order.id,
  });
};
