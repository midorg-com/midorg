let cloud = require("wx-server-sdk"); // 云开发sdk
let files = require("./apis.js"); // 引入脚本生成的函数目录数组
let Fun = {}; // 创建一个Fun对象，把所有函数放进去，方便下面调用。
// 循环函数目录数组，将它们的文件名去掉.js后缀，设置为Fun的属性名，值value则是对应的函数
// 类似于创建这样一个对象： let Fun = {
//   createGroup: require('./functions/createGroup.js'),
//   joinGroup: require('./functions/joinGroup.js'), 以此类推
// }
files.map((filename) => {
  let name = filename.replace(".js", "");
  Object.defineProperty(Fun, name, {
    value: require("./functions/" + filename), // 去搜一下这个内置函数的作用就能看懂
  });
});
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV, // 初始化云开发环境，具体查阅官方文档
});
let db = cloud.database(); // 云开发数据库对象

exports.main = async (event, context) => {
  try {
    let wxContext = cloud.getWXContext(); // 此函数可以获取发送请求用户的openid等信息
    // 判断如果Fun对象里没有对应api名称的函数，那么就抛出错误，下面的catch会统一返回错误信息。
    if (typeof Fun[event.api] !== "function") {
      throw Error("No api");
    }
    // 所有函数为异步，所以统一await 调用Fun对象中api名称的函数，第一个参数为前端传来的数据
    return await Fun[event.api](event.args, db, wxContext.OPENID, {
      cloud,
      appId: wxContext.APPID,
      unionId: wxContext.UNIONID,
    });
  } catch (error) {
    console.error(error); // try括号内的所有报错都会被catch到这里来，打印一下在后台看具体日志
    return {
      success: false,
      errorMessage: error.message,
    };
  }
};
