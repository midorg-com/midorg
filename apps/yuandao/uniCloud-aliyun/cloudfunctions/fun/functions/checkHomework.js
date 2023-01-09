let lessons = require("../lessons/code.js");
let send = require("../utils/sendSubscribeMessage");
module.exports = async (args, db, userId, ctx) => {
  let { data } = await db
    .collection("user")
    .doc(userId)
    .field({
      roles: true,
    })
    .get();
  if (!data[0].roles.includes("course")) {
    throw Error("无权限");
  }
  let _ = db.command;
  let { comment, uId, lessonId } = args;
  let lesson = lessons[lessonId];
  let level = 0;
  let score = parseInt(args.score) || 0;
  let coin = parseInt(args.coin) || 0;
  let share = parseInt(args.share) || 0;

  let hwRes = await db
    .collection("homework")
    .doc(uId + lessonId)
    .get();
  if (hwRes.data[0].checked) {
    let hw = hwRes.data[0];
    if (hw.score - lesson.score + score > 700) {
      throw Error("积分超出");
    }
    if (hw.coin - lesson.coin + coin > 10) {
      throw Error("金币超出");
    }
    if (hw.share - lesson.share + share > 1) {
      throw Error("贡献超出");
    }
  } else {
    if (score > 600) {
      throw Error("积分超出");
    }
    if (coin > 10) {
      throw Error("金币超出");
    }
    if (share > 1) {
      throw Error("贡献超出");
    }
    level = lesson.level || 1;
    score = score + lesson.score;
    coin = coin + lesson.coin;
    share = share + (lesson.share || 0);
  }
  if (
    hwRes.data[0].checkedBy &&
    hwRes.data[0].checkedBy !== userId &&
    Date.now() - hwRes.data[0].updatedAt < 3600000
  ) {
    throw Error("该作业由其他人批改");
  }
  await db
    .collection("user")
    .doc(uId)
    .update({
      codeLevel: _.inc(level),
      totalLevel: _.inc(level),
      score: _.inc(score),
      coin: _.inc(coin),
      share: _.inc(share),
      totalScore: _.inc(score),
      totalCoin: _.inc(coin),
      totalShare: _.inc(share),
      notifications: _.push({
        url: "/pages/user/userHomework",
        content: "章节 " + lesson.title + " 作业已批改，点击查看",
        createdAt: Date.now(),
      }),
    });
  let types = ["coin", "score", "level"];
  if (share) {
    types.push("share");
  }
  await db.collection("log").add({
    types,
    share,
    coin,
    score,
    level,
    createdAt: Date.now(),
    content: "作业获得：" + lesson.title,
    ref: uId + lessonId,
    userId: uId,
  });
  if (hwRes.data[0].checked) {
    await db
      .collection("homework")
      .doc(uId + lessonId)
      .update({
        comment,
        score: _.inc(score),
        coin: _.inc(coin),
        share: _.inc(share),
        status: "已批改",
        updatedAt: Date.now(),
      });
  } else {
    await db
      .collection("homework")
      .doc(uId + lessonId)
      .update({
        comment,
        score,
        coin,
        share,
        status: "已批改",
        checked: true,
        checkedBy: userId,
        updatedAt: Date.now(),
      });
    if (lessonId === "re01-001-001") {
      let user = await db.collection("user").doc(uId).get();
      let invite = user.data[0].invite;
      if (invite) {
        let iAdd = {
          score: _.inc(500),
          totalScore: _.inc(500),
          coin: _.inc(1),
          totalCoin: _.inc(1),
          share: _.inc(1),
          totalShare: _.inc(1),
        };
        await db
          .collection("user")
          .doc(invite)
          .update({
            ...iAdd,
            notifications: _.push({
              content: "邀请的好友首次作业已通过，贡献+1，金币+1 积分+500",
              createdAt: Date.now(),
            }),
          });
        await db
          .collection("user")
          .doc(uId)
          .update({
            ...iAdd,
            notifications: _.push({
              content: "首次作业已通过，好友分享额外加贡献+1，金币+1 积分+500",
              createdAt: Date.now(),
            }),
          });
        let iLog = {
          types: ["score", "coin", "share", "invite"],
          coin: 1,
          score: 500,
          share: 1,
          createdAt: Date.now(),
        };
        await db.collection("log").add([
          {
            ...iLog,
            content: "邀请好友奖励: " + invite,
            ref: invite,
            userId: uId,
          },
          {
            ...iLog,
            content: "好友分享: " + uId,
            ref: uId,
            userId: invite,
          },
        ]);
      }
    }
  }

  return await send(
    {
      title: lesson.title,
      content: comment,
      type: "已批改",
      note: "获得积分:" + score,
    },
    db,
    uId,
    ctx
  );
};
