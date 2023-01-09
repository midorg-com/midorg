module.exports = async (args, db, userId, ctx) => {
  let res = await db.collection("teamMember").doc(args._id).get();

  if (res.data[0].userId === userId) {
    await db.collection("teamMember").doc(args._id).remove();
    return true;
  } else {
    let team = await db.collection("team").doc(res.data[0].teamId).get();
    if (team.data[0].leaderId === userId) {
      await db.collection("teamMember").doc(args._id).remove();
      return true;
    }
  }
  throw Error("无权限");
};
