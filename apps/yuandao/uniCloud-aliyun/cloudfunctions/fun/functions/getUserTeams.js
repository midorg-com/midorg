module.exports = async (args, db, userId, ctx) => {
  let res = await db
    .collection("teamMember") // 先查teamMember表
    .aggregate() // 开启聚合操作
    .match({
      userId: userId
    }) // 匹配userId是自己userId的数据，再开始lookup联表查询
    .limit(10)
    .lookup({
      from: "team", // 查询team表
      localField: "teamId", // 使用 teamMember中的字段 teamId
      foreignField: "_id", // 对应team表中的 _id 字段
      as: "team", // 返回为team字段
    })
    .unwind("$team") // 把lookup过来的team数组拆分到上一层成为对象，方便一点
    .end();
  return res.data;
};
