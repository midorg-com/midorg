module.exports = async (args, db, userId, ctx) => {
  return await db
    .collection("order")
    .aggregate()
    .match({
      success: true,
    })
    .sort({
      createdAt: -1,
    })
    .skip(args.skip || 0)
    .limit(100)
    .lookup({
      from: "user",
      localField: "userId",
      foreignField: "_id",
      as: "user",
    })
    .unwind("$user")
    .end();
};
