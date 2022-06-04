// 先是引用了两个后端node.js框架内置的库，http和fs。库就是别人写好的对象和函数，直接用。
// require 是引用库的框架自带函数。
// http用来创建http服务
let http = require("http");
// fs全称是file system 文件系统，用来操作文件。
let fs = require("fs");
// node.js 所有内置的库可以搜索node.js官方文档查看:
// http://nodejs.cn/api/fs.html#fsreadfilesyncpath-options
// 其他第三方库可以去 npmjs.com 搜索查看

// 首先创建一个后端函数
function houDuan(req, res) {
  // 第一行用了fs 的readFileSync 函数
  // 翻译一下就是同步读取文件
  // 第一个参数是文件的路径"wenZi.txt"，第二个参数是字符编码格式"utf8"
  // 后面跟了一个toString()函数把读取内容转为string字符串。

  // req是发进来的网络请求数据，res是返回数据的函数
  // 这两个参数是下面的创建服务函数传进来的
  // 先用res.writeHead 统一设置返回的网络请求header。
  // 200 是网络请求状态码，一般200表示成功，404代表未找到资源
  res.writeHead(200, {
    "Content-Type": "application/json;charset=utf-8", // 内容类型，json格式
    "Access-Control-Allow-Methods": "*", // 允许请求方式，* 代表允许所有方式
    "Access-Control-Allow-Origin": "*", // 允许请求来源，* 代表允许所有来源
  });

  // 然后判断，如果来的网络请求是GET方法，那么直接end返回文字数据。
  if (req.method === "GET") {
    // 判断是否有数据文件
    if (fs.existsSync("wenZi.txt")) {
      // 如果有那么用readFileSync 同步读取文件 函数获得数据，并toString转化为字符串
      let wenZi = fs.readFileSync("wenZi.txt", "utf8").toString();
      // 返回json字符串，数据放在对象的data属性(这个随便起名)中
      res.end(JSON.stringify({ data: wenZi }));
    } else {
      // 没有则返回空对象
      res.end("{}");
    }
  } else if (req.method === "POST") {
    // 如果来的是POST方法，那么就获取传入的url参数
    // 再调用fs的写文件函数把数据写入文件。
    // decodeURI 函数解析中文
    // substring的作用可看：https://www.runoob.com/jsref/jsref-substring.html
    let xinWenZi = decodeURI(req.url.substring(1));
    fs.writeFileSync("wenZi.txt", xinWenZi);
    res.end("{}");
  } else if (req.method === "DELETE") {
    // 如果来的是DELETE方法，那么就直接调用fs的写文件函数把空数据写入文件。
    fs.writeFileSync("wenZi.txt", "");
    res.end("{}");
  } else {
    // 其他方法一律返回空json对象。
    res.end("{}");
  }
}
// 下面http对象的createServer函数创建了一个server也就是服务
// 这个服务的所有逻辑交给houDuan函数出处理，请求来的数据和返回的函数会传入houDuan函数
// 监听listen在3000端口上。
// 这个函数比较特殊，它不是一次性的，而是listen监听
// 一直会接收发到3000端口的网络请求。
http.createServer(houDuan).listen(3000);
// 在终端里显示启动成功提示
console.log("服务启动，地址：http://localhost:3000/");
