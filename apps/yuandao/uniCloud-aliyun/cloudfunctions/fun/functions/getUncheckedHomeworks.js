module.exports = async (args, db, userId, ctx) => {
  let $ = db.command.aggregate;
  let { data } = await db
    .collection("homework")
    .aggregate()
    .match({
      status: args.status || "批改中",
    })
    .sort({
      updatedAt: args.status === "批改中" ? 1 : -1,
    })
    .limit(50)
    .lookup({
      from: "user",
      localField: "userId",
      foreignField: "_id",
      as: "user",
    })
    .unwind("$user")
    .end();
  return data;
};
