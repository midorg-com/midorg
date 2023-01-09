const lessons = require("../lessons/code.js");
module.exports = async (args, db, userId, ctx) => {
  if (args.files.length === 0) {
    throw Error("请提交作业截图");
  }
  let _id = userId + args.lessonId;
  let res = await db.collection("homework").doc(_id).get();
  if (res.data[0]) {
    return await db
      .collection("homework")
      .doc(_id)
      .update({
        files: args.files,
        updatedAt: Date.now(),
        status: (res.data[0].coin || 0) > 10 ? "已批改" : "批改中",
        subscribe: args.subscribe,
        note: args.note,
      });
  } else {
    let lesson = lessons[args.lessonId];
    await db.collection("homework").add({
      _id,
      userId,
      lessonId: args.lessonId,
      status: "批改中",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      course: lesson.course,
      files: args.files,
      title: lesson.title,
      message: args.message,
      subscribe: args.subscribe,
    });
    await db
      .collection("user")
      .doc(userId)
      .update({
        lesson: {
          lessonId: lesson.next,
        },
      });
    return true;
  }
};
