module.exports = async (args, db, userId, ctx) => {
  return await db.collection("article").add({
    ...args,
    userId,
    createdAt: Date.now(),
    public: false,
    checked: false,
  });
};
