module.exports = async (args, db, userId, ctx) => {
  await db
    .collection("topic")
    .doc(args.topicId)
    .update({
      discussions: db.command.inc(1),
    });
  return await db.collection("discussion").add({
    createdAt: Date.now(),
    userId,
    ...args,
  });
};
