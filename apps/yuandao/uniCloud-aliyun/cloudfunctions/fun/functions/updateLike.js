module.exports = async (args, db, userId, ctx) => {
  let { data } = await db
    .collection("like")
    .doc(args.target + userId)
    .get();
  if (data[0]) {
    await db
      .collection("like")
      .doc(args.target + userId)
      .remove();
    return await db
      .collection(args.type)
      .doc(args.target)
      .updateAndReturn({
        likeCount: db.command.inc(-1),
      });
  } else {
    await db.collection("like").add({
      _id: args.target + userId,
      createdAt: Date.now(),
      target: args.target,
      userId,
      type: args.type,
    });
    return await db
      .collection(args.type)
      .doc(args.target)
      .updateAndReturn({
        likeCount: db.command.inc(1),
      });
  }
};
