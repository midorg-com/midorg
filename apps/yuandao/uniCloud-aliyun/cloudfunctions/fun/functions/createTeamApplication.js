module.exports = async (args, db, userId, ctx) => {
  let exist = await db.collection("teamMember").where({
    userId: userId
  }).get();
  if (exist.data.length > 9) {
    throw Error("最多加入10个小组");
  }
  let _id = userId + args.teamId;
  let {
    data
  } = await db.collection("teamApplication").doc(_id).get();
  if (data[0]) {
    throw Error("已申请过，等待组长通过");
  }
  return await db.collection("teamApplication").add({
    _id,
    userId: userId,
    teamId: args.teamId,
    role: "member", // 身份，member成员
    joinAt: Date.now(),
    application: args.application || "",
  });
};
