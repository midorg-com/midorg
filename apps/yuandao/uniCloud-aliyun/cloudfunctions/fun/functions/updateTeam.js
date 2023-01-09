module.exports = async (args, db, userId, ctx) => {
  let id = args._id;
  let team = await db.collection("team").doc(id).get();
  if (!team.data[0]) {
    throw Error("没有对应小组");
  }
  if (team.data[0].leaderId !== userId) {
    throw Error("无权限");
  }
  delete args._id;
  return await db.collection("team").doc(id).update(args);
};
