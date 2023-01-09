module.exports = async (args, db, userId, ctx) => {
  let _ = db.command;
  let members = await db
    .collection("teamMember")
    .where({
      userId: userId,
    })
    .limit(10)
    .get();
  let userTeams = members.data.map((item) => item.teamId);
  if (args._id) {
    if (userTeams.includes(args._id)) {
      throw Error("已加入该组");
    }
    let idres = await db.collection("team").doc(args._id).get();
    return idres.data;
  }
  let where = {};
  if (userTeams.length > 0) {
    where._id = _.nin(userTeams);
  }
  if (args.groupName) {
    where.groupName = args.groupName;
  }
  if (args.type) {
    where.type = args.type;
  }
  if (args.limit) {
    args.check.map((c) => {
      where[c] = true;
    });
  }
  let res = await db.collection("team").where(where).get();
  return res.data;
};
