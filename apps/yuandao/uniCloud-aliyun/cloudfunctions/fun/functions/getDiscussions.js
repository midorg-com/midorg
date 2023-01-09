module.exports = async (args, db, userId, ctx) => {
  let $ = db.command.aggregate;
  let res = await db
    .collection("discussion")
    .aggregate()
    .match({
      topicId: args.topicId,
    })
    .sort({
      createdAt: 1,
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
  let topic = await db.collection("topic").doc(args.topicId).get();
  return { list: res.data, topic: topic.data[0] };
};
