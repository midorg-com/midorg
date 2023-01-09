module.exports = async (args, db, userId, ctx) => {
  return await db.collection("homework").where({
    userId: userId
  }).orderBy("updatedAt", "desc").get()
};
