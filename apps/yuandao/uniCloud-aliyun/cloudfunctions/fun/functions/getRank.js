module.exports = async (args, db, userId, ctx) => {
  return await db
    .collection("user")
    .field({
      name: true,
      site: true,
      totalLevel: true,
      totalShare: true,
      totalScore: true,
      totalCoin: true,
      vip: true,
    })
    .orderBy(args.type, "desc")
    .limit(20)
    .get();
};
