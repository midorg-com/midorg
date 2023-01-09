module.exports = async (args, db, userId, ctx) => {
  return await db.collection("question").where({
    userId
  }).orderBy("createdAt", "desc").get()
};
