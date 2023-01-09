module.exports = async (args, db, userId, ctx) => {
  let exist = await db.collection("teamMember").where({
    userId: userId
  }).get();
  if (exist.data.filter((tm) => tm.role === "leader").length > 1) {
    throw Error("最多创建2个小组");
  }
  return await db.collection("teamForm").add({
    ...args, // js扩展运算符，填入所有表单信息
    leaderId: userId,
  });
};
