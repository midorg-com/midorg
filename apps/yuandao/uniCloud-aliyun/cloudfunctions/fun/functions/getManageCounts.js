module.exports = async (args, db, userId, ctx) => {
  let [homework, teamForm, question, article] = await Promise.all([
    db
      .collection("homework")
      .where({
        status: "批改中",
      })
      .count(),
    db.collection("teamForm").count(),
    db
      .collection("question")
      .where({
        checked: false,
      })
      .count(),
    db
      .collection("article")
      .where({
        checked: false,
      })
      .count(),
  ]);
  return {
    homeworkCount: homework.total,
    teamFormCount: teamForm.total,
    questionCount: question.total,
    articleCount: article.total,
  };
};
