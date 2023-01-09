module.exports = async (args, db, userId, ctx) => {
  return await db
    .collection("question")
    .where({
      checked: false,
    })
    .orderBy("createdAt", "desc")
    .get();
};
