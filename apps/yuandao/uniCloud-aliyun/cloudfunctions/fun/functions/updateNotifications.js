module.exports = async (args, db, userId, ctx) => {
  let {
    data
  } = await db
    .collection("user")
    .doc(userId)
    .field({
      notifications: true,
    })
    .get();
  let list = Array.isArray(data[0].notifications) ? data[0].notifications : []
  await db
    .collection("user")
    .doc(userId)
    .update({
      notifications: [],
    });
  let res = await db
    .collection("notification")
    .doc(userId)
    .field({
      updatedAt: true,
    })
    .get();
  if (res.data[0]) {
    return await db
      .collection("notification")
      .doc(userId)
      .update({
        read: db.command.push({
          each: list.reverse(),
          position: 0,
          slice: 100,
        }),
        updatedAt: Date.now()
      });
  } else {
    return await db
      .collection("notification")
      .add({
        _id: userId,
        read: list.reverse(),
        updatedAt: Date.now()
      });
  }
};
