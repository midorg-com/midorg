module.exports = async (args, db, userId, ctx) => {
  return await db.collection("communityNews").get();
};
