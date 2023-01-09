module.exports = async (args, db, userId, ctx) => {
  return await db.collection("faq").doc(args._id).update({
    ...args
  });
};
