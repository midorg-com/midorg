const unipay = require("uni-pay");
let env = require("env")();

let db = uniCloud.database({
  throwOnNotFound: false,
});
exports.main = async (event, context) => {
  try {
    const unipayIns = unipay.initWeixin({
      appId: env.WX_APPID,
      mchId: env.WX_MCHID,
      key: env.WX_PARTERNER_KEY,
    });

    let payData = await unipayIns.verifyPaymentNotify(event);
    if (payData.resultCode !== "SUCCESS") {
      throw Error(JSON.stringify(payData));
    }
    let orderId = payData.outTradeNo;
    let orderRes = await db.collection("order").doc(orderId).get();
    let order = orderRes.data[0];
    let userId = order.userId;
    let sku = order.skuData;
    let _ = db.command;
    let up = {
      allCost: _.inc(payData.totalFee),
    };
    let types = [];
    let allCoin = sku.coin ? sku.coin * order.count : undefined;
    let allShare = sku.share ? sku.share * order.count : undefined;
    let allScore = sku.score ? (sku.score * order.count) / 10 : undefined;
    if (allCoin) {
      up.coin = _.inc(allCoin);
      up.totalCoin = _.inc(allCoin);
      types.push("coin");
    }
    if (allShare) {
      up.share = _.inc(allShare);
      up.totalShare = _.inc(allShare);
      types.push("share");
    }
    if (allScore) {
      up.score = _.inc(allScore);
      up.totalScore = _.inc(allScore);
      types.push("score");
    }
    if (sku._id === "re01-会员卡") {
      up.vip = _.inc(order.count);
    }
    if (sku._id === "re01-畅行卡") {
      let user = await db.collection("user").doc(userId).get();
      let level = user.data[0].codeLevel;
      if (level < 10) {
        up.codeLevel = 10;
        up.totalLevel = 10;
        up.roles = ["lesson"];
        up.lesson = { lessonId: "re01-001-011" };
      }
    }
    let right = "";
    if (sku._id === "re01-数字版") {
      right =
        "点击复制到浏览器打开加入飞书，昵称和订单填写一致，如长时间未审核通过请联系管理员：https://metaisland.feishu.cn/invite/member/A8LQOrQgzuNVzHIu";
    }
    if (sku._id === "re01-模板授权") {
      right =
        "点击复制到浏览器打开加入阿里云云效企业，昵称设置为和订单一致，如长时间未审核通过或链接过期请联系管理员：https://account-devops.aliyun.com/account/invite?sign=f6eaee596ca229c87da3e4ec61784c52&next_url=https%3A%2F%2Fcodeup.aliyun.com%3Forg_id%3D6122297357e7cd986dfab42a";
    }
    if (sku._id === "re01-项目授权") {
      right =
        "点击复制到浏览器打开加入阿里云云效企业，昵称设置为和订单一致，如长时间未审核通过或链接过期请联系管理员：https://account-devops.aliyun.com/account/invite?sign=f6eaee596ca229c87da3e4ec61784c52&next_url=https%3A%2F%2Fcodeup.aliyun.com%3Forg_id%3D6122297357e7cd986dfab42a";
    }
    await db.collection("order").doc(orderId).update({
      details: payData,
      success: true,
      confirmedAt: Date.now(),
      right,
    });
    await db
      .collection("user")
      .doc(userId)
      .update({
        ...up,
        notifications: _.push({
          url: "/pages/user/order",
          content: "购买成功，请到-我的-我的订单页面查看详情",
          createdAt: Date.now(),
        }),
      });
    if (allCoin || allShare || allScore) {
      await db.collection("log").add({
        types,
        share: allShare,
        coin: allCoin,
        score: allScore,
        createdAt: Date.now(),
        content: "支持获得：" + orderId,
        ref: orderId,
        userId,
      });
    }
    return {
      statusCode: 200,
      headers: {
        "content-type": "text/xml;charset=utf-8",
      },
      body: `<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>`,
    };
  } catch (error) {
    console.error(error);
    await db.collection("error").add({
      msg: error.message,
      createdAt: Date.now(),
    });
    return {
      mpserverlessComposedResponse: true,
      statusCode: 400,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        code: "FAIL",
        message: "失败",
      }),
    };
  }
};
