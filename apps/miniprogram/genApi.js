const fs = require("fs"); // file system 文件系统函数，可以操控电脑文件
// readdir读取目录，sync是同步，既读取这个路径下的所有文件名
// __dirname是genApi.js文件所在的路径
let files = fs.readdirSync(__dirname + "/cloudfunctions/fun/functions");
// writeFile写入文件，第一个参数是路径和文件名，第二个参数是内容，必须是string格式
// 要写一个js文件，这里开头是js的导出函数
// 把前面读取的函数目录导出，可以被index入口那边引入
fs.writeFileSync(
  __dirname + "/cloudfunctions/fun/apis.js",
  "module.exports = " + JSON.stringify(files)
);
