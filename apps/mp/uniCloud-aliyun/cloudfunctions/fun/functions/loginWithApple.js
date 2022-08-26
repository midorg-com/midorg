let jwt = require('jsonwebtoken')
module.exports = async (args, db, openId, ctx) => {

  let userId = args.info.openid;
  let user = await db.collection('user').doc(userId).get();
  let token = 'Bearer ' + jwt.sign({
    userId
  }, ctx.env.ADMIN_SECRET)
  if (user.data[0]) {
    return {
      user: user.data[0],
      token
    }
  } else {
    let data = {
      _id: userId,
      createdAt: Date.now()
    }
    await db.collection('user').add(data);
    return {
      user: data,
      token
    }
  }
};
