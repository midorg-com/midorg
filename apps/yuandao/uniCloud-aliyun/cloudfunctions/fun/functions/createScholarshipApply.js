module.exports = async (args, db, userId, ctx) => {
  return await db.collection("scholarshipApply").add({
    createdAt: Date.now(),
    userId,
    ...args,
  });
};
