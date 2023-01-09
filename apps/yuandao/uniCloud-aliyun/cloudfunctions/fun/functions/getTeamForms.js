module.exports = async (args, db, userId, ctx) => {
  let res = await db
    .collection("teamForm")
    .get();
  return res.data
};
