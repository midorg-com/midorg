module.exports = async (args, db, userId, ctx) => {
  let $ = db.command.aggregate;
  let res = await db
    .collection("teamMember") // 先查teamMember表
    .aggregate() // 开启聚合操作
    .match({
      teamId: args.teamId
    })
    .sort({
      joinAt: 1,
    })
    .lookup({
      from: "user", // 查询user表
      localField: "userId", // 使用 teamMember中的字段 userId
      foreignField: "_id", // 对应user表中的 _id 字段
      as: "user", // 返回为user字段
    })
    .replaceRoot({
      newRoot: $.mergeObjects([$.arrayElemAt(["$user", 0]), "$$ROOT"]), // 演示和getUserTeams不同的另一种展平方式
    })
    .project({
      user: 0,
      lesson: 0,
    })
    .end();
  return res.data;
};
