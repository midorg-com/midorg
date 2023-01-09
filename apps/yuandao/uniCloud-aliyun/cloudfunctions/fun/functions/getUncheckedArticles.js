module.exports = async (args, db, userId, ctx) => {
  let $ = db.command.aggregate;
  let { data } = await db
    .collection("article")
    .aggregate()
    .match({
      checked: false,
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
