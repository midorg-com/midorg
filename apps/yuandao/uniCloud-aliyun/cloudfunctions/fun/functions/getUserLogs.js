module.exports = async (args, db, userId, ctx) => {
  if (args.type) {
    return await db
      .collection("log")
      .where({
        userId: userId,
        types: args.type,
      })
      .orderBy("createdAt", "desc")
      .get();
  } else {
    return await db
      .collection("log")
      .where({
        userId: userId,
      })
      .orderBy("createdAt", "desc")
      .get();
  }
};
