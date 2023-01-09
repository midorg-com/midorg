module.exports = async (args, db, userId, ctx) => {
  if (!args.name) {
    throw Error("请填写昵称");
  }
  let users = await db.collection("user").where({
    name: args.name
  }).get();
  if (users.data[0]) {
    throw Error("昵称已被占用");
  }
  return await db.collection("user").doc(userId).update({
    name: args.name
  });
};
