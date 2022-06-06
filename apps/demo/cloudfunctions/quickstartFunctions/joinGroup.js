const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const _ = db.command;
module.exports = async (event) => {
  try {
    let u = event.data;
    // 用户的id
    let wxContext = cloud.getWXContext();
    let openId = wxContext.OPENID;
    // 防止加入两个小组
    let exist = await db
      .collection("form")
      .where({
        _openid: openId,
      })
      .get();
    if (exist.data[0] && exist.data[0].groupId) {
      return {
        success: false,
        errorMessage: "已有小组",
      };
    }

    // 有可能在填写时就加满了，要先查一下
    let res = await db
      .collection("group")
      .where({
        groupId: u.groupId,
      })
      .get();
    if ((res.data[0].member || 1) > 5) {
      return {
        success: false,
        errorMessage: "填写信息时小组已满",
      };
    }

    // 更新小组成员数量
    await db
      .collection("group")
      .where({
        groupId: u.groupId,
      })
      .update({
        data: {
          member: _.inc(1),
        },
      });
    await db.collection("form").add({
      data: {
        nickname: u.nickname,
        gender: u.gender === "nv",
        region: u.region,
        code: u.code,
        age: u.age,
        info: u.info,
        isLeader: false,
        _openid: openId,
        groupId: u.groupId,
      },
    });
    return {
      success: true,
      code: res.data[0].code,
      groupId: u.groupId,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errorMessage: error.message,
    };
  }
};
