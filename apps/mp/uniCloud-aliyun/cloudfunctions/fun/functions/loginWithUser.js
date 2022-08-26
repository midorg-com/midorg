let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
module.exports = async (args, db, openId, ctx) => {
  let { userName, password } = args;

  let user = await db
    .collection("user")
    .where({
      userName,
    })
    .get();
  if (user.data[0]) {
    let check = await bcrypt.compare(password, user.data[0].hash);
    if (!check) {
      throw Error("密码错误");
    }
    let token =
      "Bearer " +
      jwt.sign(
        {
          userId: user.data[0]._id,
        },
        ctx.env.ADMIN_SECRET
      );
    return {
      user: user.data[0],
      token,
    };
  } else {
    let hash = await bcrypt.hash(password, 10);
    let data = {
      userName,
      hash,
      createdAt: Date.now(),
    };
    let userRes = await db.collection("user").add(data);
    return {
      user: {
        ...data,
        _id: userRes.id,
      },
      token:
        "Bearer " +
        jwt.sign(
          {
            userId: userRes.id,
          },
          ctx.env.ADMIN_SECRET
        ),
    };
  }
};
