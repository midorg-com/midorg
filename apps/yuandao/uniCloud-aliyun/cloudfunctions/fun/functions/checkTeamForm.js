module.exports = async (args, db, userId, ctx) => {
  if (args.action === "create") {
    let form = await db.collection("teamForm").doc(args._id).get();
    let team = form.data[0];
    if (!team) {
      throw Error(form.data);
    }
    let res = await db.collection("team").orderBy("_id", "desc").limit(1).get();
    let teamId = res.data[0]._id + 1;

    let data = {
      ...team,
      createdAt: Date.now(), // 当前数据库时间
      _id: teamId, // _id 是云开发数据库的默认id，不填为随机，填序号可以防止序号重复，因为会报错重试
    };
    await db.collection("team").add(data);
    // 给teamMember 小组成员表添加数据
    // 这是一种很常用的数据库设计叫做中间表，就是创建一个teamMember小组成员表，存放小组和用户的对应关系，这样就不用分别在用户和小组的记录里都存放小组列表和成员列表了。很多人喜欢用mysql的外键方式存对应关系，那种在企业内是禁止的，有性能问题，而且看了下云开发数据库也不支持
    await db.collection("teamMember").add({
      userId: team.leaderId,
      teamId: data._id,
      role: "leader", // 身份，leader小组长
      joinAt: Date.now(),
    });
  }
  return await db.collection("teamForm").doc(args._id).remove();
};
