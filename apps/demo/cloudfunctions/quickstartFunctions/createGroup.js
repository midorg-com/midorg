const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

module.exports = async (event) => {
  try {
    let u = event.data;
    //   userId? 一般来说是自行实现，小程序提供了openid比较方便
    let wxContext = cloud.getWXContext();
    let openId = wxContext.OPENID;
    // 防止加入两个小组
    let exist = await db
      .collection("test-form")
      .where({
        openId,
      })
      .get();
    if (exist.data[0] && exist.data[0].groupId) {
      return {
        success: false,
        errorMessage: "已有小组",
      };
    }
    // 想要递增小组id怎么办
    let res = await db.collection("test-group").count();
    let groupId = parseInt(res.total) + 1;
    // 严格项目需要事务功能，可以自行搜索并查看文档
    await db.collection("test-group").add({
      data: {
        leader: u.nickname,
        region: u.region,
        code: u.code,
        age: u.age,
        info: u.info,
        member: 1,
        openId,
        groupId,
      },
    });

    await db.collection("test-form").add({
      data: {
        nickname: u.nickname,
        gender: u.gender === "nv",
        region: u.region,
        code: u.code,
        age: u.age,
        info: u.info,
        isLeader: true,
        openId,
        groupId,
      },
    });
    return {
      success: true,
      groupId,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: error.message,
    };
  }
};
