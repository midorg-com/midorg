module.exports = async (args, db, userId, ctx) => {
  let exist = await db
    .collection("teamMember")
    .where({
      userId: userId,
    })
    .get();
  if (exist.data.length > 9) {
    throw Error("最多加入10个小组");
  }
  if (exist.data.find((item) => item.teamId === args.teamId)) {
    throw Error("已加入");
  }
  let data = {
    userId: userId,
    teamId: args.teamId,
    role: "member", // 身份，member成员
    joinAt: Date.now(),
  };
  return await db.collection("teamMember").add(data);
};
