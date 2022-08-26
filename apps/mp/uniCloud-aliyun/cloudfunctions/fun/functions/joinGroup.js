module.exports = async (args, db, openId, ctx) => {
  const _ = db.command;
  let exist = await db
    .collection("form")
    .where({
      _openid: openId,
    })
    .get();
  if (exist.data[0] && exist.data[0].groupId) {
    throw Error("已有小组");
  }

  // 有可能在填写时就加满了，要先查一下
  let res = await db
    .collection("group")
    .where({
      groupId: args.groupId,
    })
    .get();
  if ((res.data[0].member || 1) > 5) {
    throw Error("填写信息时小组已满");
  }

  // 更新小组成员数量
  await db
    .collection("group")
    .where({
      groupId: args.groupId,
    })
    .update({
      data: {
        member: _.inc(1),
      },
    });
  await db.collection("form").add({
    data: {
      nickname: args.nickname,
      gender: args.gender === "nv",
      region: args.region,
      code: args.code,
      age: args.age,
      info: args.info,
      isLeader: false,
      _openid: openId,
      groupId: args.groupId,
    },
  });
  return {
    code: res.data[0].code,
    groupId: args.groupId,
  };
};
