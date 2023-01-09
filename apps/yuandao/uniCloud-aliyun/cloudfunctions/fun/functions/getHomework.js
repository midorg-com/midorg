const lessons = require("../lessons/code.js");
module.exports = async (args, db, userId, ctx) => {
  let lessonId = args.lessonId;
  let res = await db
    .collection("homework")
    .doc(userId + lessonId)
    .get();
  if (!lessons[lessonId]) {
    throw Error("该课程作业暂未开放，如有错误请联系管理员");
  }
  let ed = res.data[0] || {};
  let data = {
    ...lessons[lessonId],
    files: ed.files || [],
    note: ed.note || "",
    comment: ed.comment || "",
    lessonId,
    update: Boolean(ed),
  };
  return data;
};
