module.exports = async (args, db, userId, ctx) => {
  if (args.action === "create") {
    let exist = await db
      .collection("teamMember")
      .where({
        userId: args.userId
      })
      .get();
    if (exist.data.length > 9) {
      throw Error("该用户小组数超出10");
    }
    let data = {
      userId: args.userId,
      teamId: args.teamId,
      role: "member",
      joinAt: Date.now(),
    };
    await db.collection("teamMember").add(data);
  }
  return await db.collection("teamApplication").doc(args._id).remove();
};
