let cloud = require("wx-server-sdk"); // 云开发sdk
const fs = require("fs"); // file system 文件系统函数，可以操控电脑文件
// readdir读取目录，sync是同步，既读取这个路径下的所有文件名
// __dirname是genApi.js文件所在的路径
let files = fs.readdirSync(__dirname + "/functions");
let Fun = {}; // 创建一个Fun对象，把所有函数放进去，方便下面调用。
// 循环函数目录数组，将它们的文件名去掉.js后缀，设置为Fun的属性名，值value则是对应的函数
// 类似于创建这样一个对象： let Fun = {
//   createGroup: require('./functions/createGroup.js'),
//   joinGroup: require('./functions/joinGroup.js'), 以此类推
// }
files.map((filename) => {
  let name = filename.replace(".js", "");
  Object.defineProperty(Fun, name, {
    value: require("./functions/" + filename), // 去搜一下这个defineProperty函数的作用就能看懂
  });
});
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV, // 初始化云开发环境，具体查阅官方文档
});
let db = cloud.database({ throwOnNotFound: false }); // 云开发数据库对象

exports.main = async (event, context) => {
  try {
    let wxContext = cloud.getWXContext(); // 此函数可以获取发送请求用户的openid等信息
    // 判断如果Fun对象里没有对应api名称的函数，那么就抛出错误，下面的catch会统一返回错误信息。
    if (typeof Fun[event.api] !== "function") {
      throw Error("No api");
    }
    // 所有函数为异步，所以统一await 调用Fun对象中api名称的函数，第一个参数为前端传来的数据
    let data = await Fun[event.api](event.args, db, wxContext.OPENID, {
      cloud,
      appId: wxContext.APPID,
      unionId: wxContext.UNIONID,
    });
    return { success: true, data };
  } catch (error) {
    console.error(error); // try括号内的所有报错都会被catch到这里来，打印一下在后台看具体日志
    return {
      success: false,
      errorMessage: error.message,
    };
  }
};
