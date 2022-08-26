let jwt = require("jsonwebtoken");
let fs = require("fs");
let files = fs.readdirSync(__dirname + "/functions");
let Fun = {};
files.map((filename) => {
  let name = filename.replace(".js", "");
  Object.defineProperty(Fun, name, {
    value: require("./functions/" + filename), // 去搜一下这个defineProperty函数的作用就能看懂
  });
});
let db = uniCloud.database({
  throwOnNotFound: false,
});
let env = require("./env.js");

exports.main = async (event, context) => {
  try {
    let { api, args, token } = event.body ? JSON.parse(event.body) : event;

    if (typeof Fun[api] !== "function") {
      throw Error("No api");
    }

    let auth = {};
    if (!token && !api.startsWith("login")) {
      throw Error("请登录后操作");
    } else if (token) {
      auth = jwt.verify(token.replace("Bearer ", ""), env.ADMIN_SECRET);
    }

    let data = await Fun[api](args, db, auth.userId, {
      uniCloud,
      auth,
      env,
    });
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(error); // try括号内的所有报错都会被catch到这里来，打印一下在后台看具体日志
    return {
      success: false,
      errorMessage: error.message,
    };
  }
};
