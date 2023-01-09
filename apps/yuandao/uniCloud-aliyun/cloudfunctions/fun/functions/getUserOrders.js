module.exports = async (args, db, userId, ctx) => {
  return await db
    .collection("order")
    .where({
      userId,
    })
    .orderBy("createdAt", "desc")
    .get();
};
