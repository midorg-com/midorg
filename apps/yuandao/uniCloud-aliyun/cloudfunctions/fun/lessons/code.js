let code = {
  course: "从零开始的编程之路",
  platform: "B站(哔哩哔哩)",
  required:
    "截图1：前往B站对应章节点赞投币收藏后截图(元岛的可持续发展需要每一名社员的支持)。\n截图2：评论区提交作业（推荐）或者是自己的网站、笔记也行。",
  advanced:
    "（可选项）抖音、快手、微信视频号、小红书、知乎五个平台的点赞收藏截图，每完成一个100积分。6个平台都完成召唤大奖获得额外10金币和1点贡献。(新号不要密集点赞收藏，别判定为刷赞。最好一个作业一个作业来，巩固学习，或者间隔10秒)",
  coin: 1,
  level: 1,
  score: 100,
};

module.exports = {
  "re01-001-001": {
    lessonId: "re01-001-001",
    title: "编程的本质",
    homework:
      "套用函数的三段式结构：参数-处理-输出，写一个或几个生活中的函数。",
    example:
      "这是优秀作业示例(这节是不写代码的, 只写文字): 参数：西红柿400克、鸡蛋60克、盐1克、油20克、糖5克；处理：去皮西红柿切块，去壳鸡蛋搅匀，油倒入锅中点火加热至120度，倒入鸡蛋翻炒至金黄色，倒入切块西红柿，翻炒1分钟，加入盐和糖，翻炒10秒装盘。输出：一盘西红柿炒鸡蛋。",
    url: "https://b23.tv/csmjyLT",
    next: "re01-001-002",
    ...code,
    reward: "以及奖学金评选资格",
    share: 1,
    score: 300,
    know: "学完本期，我们将学会从编程的视角看待世界，初步拥有结构化思维，迈出未来世界的第一步。",
  },
  "re01-001-002": {
    lessonId: "re01-001-002",
    title: "第一行代码",
    homework:
      "如果本节遇到问题就去阅读“常见问题”里的内容。点“提交作业”提交你的第一行代码评论截图，注意英文字符和格式。",
    next: "re01-001-003",
    url: "https://b23.tv/ezmVkya",
    ...code,
    score: 200,
    know: "本期我们将完成自己的第一行代码，破除对编程的恐惧和陌生，勇敢踏出第一步。",
  },
  "re01-001-003": {
    lessonId: "re01-001-003",
    title: "入门网页前端",
    homework:
      "使用元岛html编辑器“www.midorg.com/h.html” 去100%照抄视频中的网页，包括每一个标点符号，英文字母，空格和换行（p标签中的内容可以替换）。自定义修改和添加图片是后面几节课学的内容。",
    next: "re01-001-004",
    url: "https://b23.tv/CcPhnIG",
    ...code,
    score: 200,
    coin: 2,
    know: "在本节课后，我们将写出自己的第一个网页。",
  },
  "re01-001-004": {
    lessonId: "re01-001-004",
    title: "上线网站",
    homework:
      "上线你的第一个个人网站，提交你的github网站(无法访问就去使用unicloud静态托管)链接（注意文件名必须严格为index.html，不能有空格、括号等等）, 暂时没有电脑的可以用热铁盒。",
    next: "re01-001-005",
    url: "https://b23.tv/b3toiOz",
    ...code,
    share: 1,
    score: 200,
    reward: "进入静态丛林群",
    know: "上线！把我们的个人网站放到互联网上让全世界的人访问。",
  },
  "re01-001-005": {
    lessonId: "re01-001-005",
    title: "编程环境配置",
    homework:
      "前往www.midorg.com/vsc.html 下载并熟悉vscode的使用，完成git、nodejs的安装即可。没有电脑的用WebCat、aide之类的app，或者去网吧。提交你的vscode使用经验。",
    next: "re01-001-006",
    url: "https://b23.tv/WW1zG0W",
    ...code,
    know: "本期将配置我们未来要深入编程所使用的所有工具、环境，打下坚实的基础。",
  },
  "re01-001-006": {
    lessonId: "re01-001-006",
    title: "html 入门",
    homework: "过一遍MDN的HTML教程，提交你自己搜索写的一些html 标签代码。",
    next: "re01-001-007",
    url: "https://b23.tv/OOQMbSk",
    ...code,
    know: "本期我们来熟悉html的标准结构，理解HTML的意义，学习如何查询并使用html标签",
  },
  "re01-001-007": {
    lessonId: "re01-001-007",
    title: "html 实践",
    homework:
      "去菜鸟教程照着html 标签目录全部依次抄一遍所有标签，理解用途。熟练使用浏览器开发者工具改变元素，熟悉图片相对路径的引用，提交带相对路径图片标签的代码。",
    next: "re01-001-008",
    url: "https://b23.tv/dKXL1h6",
    ...code,
    know: "本期我们将了解所有HTML标签，学习相对路径和绝对路径，解决所有图片不显示的问题（小白的大boss）。并且熟悉浏览器开发者工具，它是我们写网页最重要的工具之一。",
  },
  "re01-001-008": {
    lessonId: "re01-001-008",
    title: "css 入门",
    homework: "过一遍MDN的CSS教程，提交你自己搜索写的一些css 规则代码。",
    next: "re01-001-009",
    url: "https://b23.tv/L9xImHq",
    ...code,
    know: "初步认识CSS，了解如何打扮漂亮我们的个人网站",
  },
  "re01-001-009": {
    lessonId: "re01-001-009",
    title: "css 布局",
    homework:
      "去菜鸟教程熟悉一些 css 规则，在开发者工具中熟悉css 的修改。提交你尝试的一些CSS属性。",
    next: "re01-001-010",
    url: "https://b23.tv/SHrR0rI",
    ...code,
    know: "合理的布局是编写网页的基础，CSS是重中之重",
  },
  "re01-001-010": {
    lessonId: "re01-001-010",
    title: "css Flex",
    homework:
      "学习flex属性并玩通关flex游戏。先完全按照视频写一个flex布局页面，完成后再尝试自定义，提交你的学习经验。",
    next: "re01-001-011",
    url: "https://b23.tv/JURGw75",
    ...code,
    score: 200,
    know: "本期的flex小游戏非常有意思。学习CSS Flex，深入理解现代网站最主流的布局方式",
  },
  "re01-001-011": {
    lessonId: "re01-001-011",
    title: "搜索并完善网站",
    homework:
      "将自己个人网站的无障碍、最佳做法、SEO评分提升至100分，性能提升至90分以上，提交网站链接和改善经历。如果有备案域名的话提交搜索引擎收录。如果成功给你的朋友或者客户做出网站，将加分",
    next: "re01-002-001",
    url: "https://b23.tv/ORgARau",
    ...code,
    share: 1,
    score: 200,
    know: "本期我们会优化自己的网站得分，它是我们个人网站是否优秀的重要标志",
  },
  "re01-002-001": {
    lessonId: "re01-002-001",
    title: "内容管理",
    homework: "写下你想实现的产品吧！",
    next: "re01-002-002",
    url: "https://b23.tv/NTgjrtF",
    ...code,
    score: 200,
    know: "本期我们将初步了解产品思维，这对我们做出一个受人欢迎的产品非常有帮助",
  },
  "re01-002-002": {
    lessonId: "re01-002-002",
    title: "编程语言的结构",
    homework:
      "体验js语言，去MDN过一遍JS教程，模仿一个点赞函数，只提交点赞函数逻辑即可，不要写script标签",
    next: "re01-002-003",
    url: "https://b23.tv/rfu0ZIQ",
    ...code,
    score: 200,
    know: "认识所有编程语言的结构，初步学习JavaScript",
  },
  "re01-002-003": {
    lessonId: "re01-002-003",
    title: "JavaScript前后端速通",
    homework:
      "完成本节课，阅读知识图谱中的所有文章。写一个自己的浏览器起始页，提交你的起始页链接",
    next: "re01-002-004",
    url: "https://b23.tv/Qbm8pBE",
    ...code,
    coin: 10,
    score: 500,
    share: 1,
    reward: "进入前端营地群",
    know: "我们将用一节课速通JavaScript前端和后端，从一个整体的视角掌握这门语言，掌握编程",
  },
  "re01-002-004": {
    lessonId: "re01-002-004",
    title: "程序or产品？",
    homework: "初识产品思维，拆解一下你的浏览器起始页逻辑，写下你想实现的产品",
    next: "re01-002-005",
    url: "https://b23.tv/0qWPBF3",
    ...code,
    score: 100,
    know: "本期我们将认识到一个点，只有坚实的基础，才能铸就一个无限的未来",
  },
  "re01-002-005": {
    lessonId: "re01-002-005",
    title: "一期学会写小程序",
    homework:
      "先把元岛0.2模仿出来，然后再尝试自定义修改，提交你的学习经验（无法注册的可以去掉后端部分）",
    next: "re01-002-006",
    example:
      "学习本节课需要你同时阅读小程序官方文档和教程：https://developers.weixin.qq.com/community/business/course/000264e20a0dd8e69669b609451c0d",
    url: "https://b23.tv/0x9zWJl",
    ...code,
    score: 500,
    know: "编程是非常看重实践的，我们将在此节课完成第一个正式的项目，并且学会小程序",
    example:
      "本期视频有失误，全部删掉后修改不会显示，建议不要删除index目录下的文件，或者去看day3的bug解释。",
  },
  "re01-002-006": {
    lessonId: "re01-002-006",
    title: "GitHub介绍",
    homework:
      "逛一逛Github，根据我的方法，解决网络问题，视频评论提交你的成功方法",
    example:
      "多种访问方法见这里，尝试其中一个可以就行了：https://www.midorg.com/vsc.html",
    next: "re01-002-007",
    url: "https://b23.tv/C60On1s",
    ...code,
    know: "本期我们将了解github，它是程序员之家",
  },
  "re01-002-007": {
    lessonId: "re01-002-007",
    title: "Git、GitHub入门",
    homework: "按照格式提交你的pr，视频下提交pr地址即可",
    next: "re01-002-008",
    url: "https://b23.tv/FQXSUXg",
    ...code,
    score: 300,
    coin: 2,
    know: "本期我们将学会git，学会使用github，这是工作和团队协作的基础。",
  },
  "re01-002-008": {
    lessonId: "re01-002-008",
    title: "后端运维概念",
    homework: "提交你前面小程序中使用Serverless的体验",
    next: "re01-002-009",
    url: "https://b23.tv/Jj7IUC5",
    ...code,
    know: "本期我们将学会后端运维的概念，初步了解运维的演进和未来，它是支撑我们产品的坚实基础。",
  },
  "re01-002-009": {
    lessonId: "re01-002-009",
    title: "小程序day2",
    homework: "模仿40行代码，体会编程之美，评论写你学到的逻辑",
    next: "re01-002-010",
    url: "https://b23.tv/dMuJYNa",
    ...code,
    score: 300,
    know: "本期我们将用四十行代码改善前面的小程序项目，体会编程的美。",
  },
  "re01-002-010": {
    lessonId: "re01-002-010",
    title: "信息和知识",
    homework: "分享一下那些你实践出真知的经验，提交评论",
    next: "re01-002-011",
    url: "https://b23.tv/IcgxHdl",
    ...code,
    score: 200,
    know: "理解信息和知识，它是人生中非常核心的一个概念",
  },
  "re01-002-011": {
    lessonId: "re01-002-011",
    title: "小程序day3",
    homework: "再次优化前端的请求代码，评论封装的作用",
    next: "re01-002-012",
    url: "https://b23.tv/5F9r7zU",
    ...code,
    score: 300,
    know: "本期我们再来封装一个函数，体会工程化思维，它将是我们项目优秀的起点。",
  },
  "re01-002-012": {
    lessonId: "re01-002-012",
    title: "小程序day4",
    homework: "说一说表格和数据库的对比",
    next: "re01-002-013",
    url: "https://b23.tv/WrXxR7F",
    ...code,
    score: 300,
    know: "本期我们将认识数据库和用户表，再次理解数据。",
  },
  "re01-002-013": {
    lessonId: "re01-002-013",
    title: "云刺客",
    homework:
      "去销毁腾讯云云开发环境防止扣费，预习unicloud和uni-app，注册并实名认证unicloud，去分享下被腾讯坑的经历~",
    next: "re01-002-014",
    url: "https://b23.tv/9yklxiP",
    ...code,
    know: "本期是一个提醒",
  },
  "re01-002-014": {
    lessonId: "re01-002-014",
    title: "uni技术栈开发留言板",
    homework: "成功模仿出一个留言板小程序，分享你的解决bug经验",
    next: "re01-002-015",
    url: "https://b23.tv/SoK3Yh8",
    ...code,
    know: "本期我们将学会vue的基本语法，unicloud后端及数据库使用，完成一个留言板小程序",
    example: "hbuilderx的bug非常多，遇到错误看下一期",
  },
  "re01-002-015": {
    lessonId: "re01-002-015",
    title: "uniapp发布app网页",
    homework: "将上期的项目发布为网页和安卓app，提交你的心得体会",
    next: "re01-002-016",
    url: "https://b23.tv/WSdZI4z",
    ...code,
    know: "本期我们将学会如何将留言板小程序发布正式版小程序，并同时发布网页和APP",
  },
  "re01-002-016": {
    lessonId: "re01-002-016",
    title: "登录注册功能",
    homework: "给自己的产品加上用户功能，完成登录注册",
    next: "re01-002-017",
    url: "https://b23.tv/bPyXnZ7",
    ...code,
    know: "本期我们将学会软件最常见最基础的功能-用户登录注册",
  },
};
