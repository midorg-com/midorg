let jwt = require("jsonwebtoken");
let env = require("env")();
let login = require("./utils/login.js");
let fs = require("fs");
let files = fs.readdirSync(__dirname + "/functions");
let Fun = {};
files.map((filename) => {
  let name = filename.replace(".js", "");
  Object.defineProperty(Fun, name, {
    value: require("./functions/" + filename),
  });
});
let db = uniCloud.database({
  throwOnNotFound: false,
});

exports.main = async (event, context) => {
  try {
    let Authorization = event.Authorization;
    if (!Authorization) {
      return await login(event, db, env);
    }
    let token = Authorization.replace("Bearer ", "");
    let auth = jwt.verify(token, env.ADMIN_SECRET);
    if (typeof Fun[event.api] !== "function") {
      throw Error("无接口");
    }
    let data = await Fun[event.api](event.args, db, auth.userId, {
      cloud: uniCloud,
      auth,
      env,
    });
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errorMessage: error.message,
    };
  }
};
