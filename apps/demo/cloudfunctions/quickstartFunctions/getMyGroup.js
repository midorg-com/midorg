const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const _ = db.command;
module.exports = async (event) => {
  try {
    let wxContext = cloud.getWXContext();
    let openId = wxContext.OPENID || "test";
    let res = await db
      .collection("form")
      .where({
        _openid: openId,
      })
      .get();

    return {
      success: true,
      groupId: res.data[0] ? res.data[0].groupId : "",
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: error,
    };
  }
};
