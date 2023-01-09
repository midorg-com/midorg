let send = require("../utils/sendSubscribeMessage");
module.exports = async (args, db, userId, ctx) => {
  let _ = db.command;
  let questionId = args._id;
  delete args._id;
  await db
    .collection("question")
    .doc(questionId)
    .update({
      ...args,
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
        share: _.inc(1),
        totalShare: _.inc(1),
        notifications: _.push({
          url: "/pages/user/userQuestion",
          content: "问题被采纳，贡献+1, 金币+1, 积分+200, 点击查看",
          createdAt: Date.now(),
        }),
      });
    await db.collection("log").add({
      types: ["score", "coin", "share"],
      coin: 1,
      score: 200,
      share: 1,
      createdAt: Date.now(),
      content: "问题采纳: " + questionId,
      userId: args.userId,
    });
  } else {
    await db
      .collection("user")
      .doc(args.userId)
      .update({
        notifications: db.command.push({
          url: "/pages/user/userQuestion",
          content: "你的问题未被采纳，点击查看",
          createdAt: Date.now(),
        }),
      });
  }
  return await send(
    {
      title: "你的问题已回复",
      content: args.question,
      type: args.adopted ? "已采纳" : "未采纳，查看回复",
      note: args.adopted ? "查看获得奖励" : "感谢你的提问",
      page: "/pages/user/userQuestion",
    },
    db,
    args.userId,
    ctx
  );
};
