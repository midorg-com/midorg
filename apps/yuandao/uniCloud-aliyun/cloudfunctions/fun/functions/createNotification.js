module.exports = async (args, db, userId, ctx) => {
  let obj = {
    url: args.url,
    content: args.content,
    createdAt: Date.now(),
  };
  return await db
    .collection("user")
    .doc(userId)
    .update({
      notifications: db.command.push([obj]),
    });
};
