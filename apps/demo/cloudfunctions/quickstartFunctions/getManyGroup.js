const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const _ = db.command;
module.exports = async (event) => {
  try {
    let res = await db
      .collection("group")
      .where({
        member: _.lt(6),
      })
      .orderBy("groupId", "asc")
      .get();
    return {
      success: true,
      groupList: res.data,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: error,
    };
  }
};
