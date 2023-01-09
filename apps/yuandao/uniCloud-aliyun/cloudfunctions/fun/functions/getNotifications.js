module.exports = async (args, db, userId, ctx) => {
  let res = await db
    .collection("notification")
    .doc(userId)
    .get();
  return res.data[0];
};
