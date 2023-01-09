module.exports = async (args, db, userId, ctx) => {
  await db.collection("question").doc(args._id).remove();
  let obj = {
    content: args.content,
    createdAt: Date.now(),
  };
  return await db
    .collection("user")
    .doc(args.userId)
    .update({
      notifications: db.command.push([obj]),
    });
};
