module.exports = async (args, db, userId, ctx) => {
  let { data } = await db
    .collection("faq")
    .where({
      lessonId: args.lessonId,
    })
    .orderBy("likeCount", "desc")
    .get();
  await Promise.all(
    data.map(async (item, key) => {
      let like = await db
        .collection("like")
        .doc(item._id + userId)
        .get();
      data[key].liked = like.data[0];
      if (item.userId) {
        let user = await db.collection("user").doc(item.userId).get();
        data[key].author = user.data[0];
      }
    })
  );
  return { data };
};
