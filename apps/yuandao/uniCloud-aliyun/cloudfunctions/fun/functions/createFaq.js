module.exports = async (args, db, userId, ctx) => {
  let questionId = args._id;
  delete args._id;
  return await db.collection("faq").add({
    createdAt: Date.now(),
    sort: parseInt(args.sort),
    questionId,
    ...args,
    userId,
  });
};
