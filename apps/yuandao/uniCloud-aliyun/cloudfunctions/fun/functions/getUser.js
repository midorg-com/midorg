const lessons = require("../lessons/code.js");

module.exports = async (args, db, userId, ctx) => {
  let { data } = await db.collection("user").doc(userId).get();
  let lessonId = data[0].lesson.lessonId;
  data[0].lesson = lessons[lessonId] || { lessonId };
  return data[0];
};
