module.exports = async (args, db, userId, ctx) => {
  let res = await db.collection("topic").where({ type: args.type }).get();
  return res.data;
};
