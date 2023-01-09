module.exports = async (args, db, userId, ctx) => {
  let data = {
    bio: args.bio,
    site: args.site,
    bilibili: args.bilibili,
    dy: args.dy,
  };
  return await db.collection("user").doc(userId).update(data);
};
