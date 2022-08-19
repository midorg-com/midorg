module.exports = async (args, db, openId, ctx) => {
  let res = await db
    .collection("form")
    .where({
      _openid: openId,
    })
    .get();

  return {
    groupId: res.data[0] ? res.data[0].groupId : "",
  };
};
