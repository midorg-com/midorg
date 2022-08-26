module.exports = async (args, db, openId, ctx) => {
  const _ = db.command;
  let res = await db
    .collection("group")
    .where({
      member: _.lt(6),
    })
    .orderBy("groupId", "asc")
    .get();
  return {
    groupList: res.data,
  };
};
