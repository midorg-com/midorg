module.exports = async (args, db, userId, ctx) => {
  let _ = db.command;
  let articleId = args._id;
  delete args._id;
  await db
    .collection("article")
    .doc(articleId)
    .update({
      ...args,
      public: args.adopted,
      checked: true,
    });
  if (args.adopted) {
    await db
      .collection("user")
      .doc(args.userId)
      .update({
        score: _.inc(200),
        totalScore: _.inc(200),
        coin: _.inc(1),
        totalCoin: _.inc(1),
        notifications: _.push({
          content: "学习分享被采纳，金币+1, 积分+200",
          createdAt: Date.now(),
        }),
      });
    await db.collection("log").add({
      types: ["score", "coin"],
      coin: 1,
      score: 200,
      createdAt: Date.now(),
      content: "分享采纳: " + articleId,
      userId: args.userId,
    });
  } else {
    await db
      .collection("user")
      .doc(args.userId)
      .update({
        notifications: db.command.push({
          content: "你的分享未被采纳 " + args.reply || "",
          createdAt: Date.now(),
        }),
      });
  }
  return true;
};
