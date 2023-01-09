let list = [
  {
    title: "网页基础入门",
    content: "学习1-4节视频课，上线自己的个人网站",
  },
  {
    title: "HTML 基础",
    content: "学习5-7节视频课，过一遍MDN的HTML教程",
  },
  {
    title: "HTML 入门",
    content: "把所有的HTML标签写一遍",
  },
  {
    title: "CSS 基础",
    content: "学习第8-9节视频课，过一遍MDN 的CSS教程",
  },
  {
    title: "CSS 布局",
    content: "学习第10节视频课，写一个Flex布局页面",
  },
  {
    title: "CSS 入门",
    content: "把所有的CSS规则写一遍",
  },
  {
    title: "完善个人网站",
    content: "把自己的个人网站完善好",
  },
  {
    title: "优化个人网站",
    content:
      "学习第11节视频课，将自己个人网站的无障碍、最佳做法、SEO评分提升至100分，性能提升至90分以上",
  },
  {
    title: "推销建站服务",
    content:
      "在朋友圈询问谁需要个人网站，免费帮做，并开始服务（实在没有的就仿写一个自己喜欢的品牌官网静态页面）",
  },
  {
    title: "完成建站",
    content: "继续前一天的建站服务，两天完成一个简单的静态网页",
  },
];
module.exports = async (args, db, userId, ctx) => {
  return {
    data: list,
  };
};
