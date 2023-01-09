let send = require("../utils/sendSubscribeMessage");

module.exports = async (args, db, userId, ctx) => {
  let data = {};
  if (args.files) {
    data.files = args.files;
  }
  if (args.comment) {
    data.comment = args.comment;
    await db
      .collection("user")
      .doc(args.uId)
      .update({
        notifications: db.command.push({
          url: "/pages/user/userHomework",
          content: "一份作业需修改，点击查看",
          createdAt: Date.now(),
        }),
      });
    await send(
      {
        title: "一份作业需修改",
        content: args.comment,
        type: "需修改",
        note: "获得积分: 0 ",
      },
      db,
      args.uId,
      ctx
    );
  }
  if (args.status) {
    data.status = args.status;
  }
  return await db
    .collection("homework")
    .doc((args.uId || userId) + args.lessonId)
    .update(data);
};
