<template>
  <view>
    <view class="card mg40">
      <view class="fs36 mgb20">百天蜕变挑战</view>
      <view class="mgb20">
        以下是《从零开始的编程之路》百天蜕变挑战计划，通过合理的学习路线设计，坚持百天学习完成后就能成为一个可以独立开发商业项目的全栈工程师。
      </view>
    </view>
    <view class="card mg40">
      <view v-for="(item, index) in list" :key="index">
        <view class="fs36 mgb20 fwb">第{{ index + 1 }}天</view>
        <view class="mgb20"> 标题：{{ item.title }} </view>
        <view class="wba mgb40"> 作业：{{ item.content }} </view>
      </view>
    </view>
    <view class="card mg40">
      <view class="fs36 mgb20">蜕变辅助</view>
      <view class="mgb20">
        《Re01》的目标是教会更多人编程，让每一个人都能充分利用人类历史上最伟大的工具-计算机。
      </view>
      <view class="mgb20">
        尽管内容已经努力简单了，但很多同学是纯纯的小白，以前没有接触过电脑，不知道怎么学怎么写，在学习过程中遇到太多问题，不知道如何解决，导致还是有很多人被拒之门外。另外也有很多人抱着收藏就是学会的心态，三分钟热度，无法坚持下去。
      </view>
      <view class="mgb20"
        >所以元岛在认真考虑后决定做一个私教功能，私教教练由等级高的同学担任。</view
      >
      <view class="mgb20">
        私教功能是给广大同学提供一个比培训班更好的学习方式，让更多基础薄弱的同学也能学会知识。因为每一个私教都是真实踩过坑学过的，明白小白的想法和路径，有耐心有时间，能手把手指导，减轻遇到错误无法解决的挫败感。
      </view>
      <view class="mgb20"
        >很多人去培训班花几万块钱其实也是看录好的视频课，花钱买个认真和氛围而已。不信的话可以去搜一下很多培训过的人写的经历看看，注意鉴别培训机构的小号。</view
      >
      <view class="mgb20">
        如果你想要别人用类似健身房私教这种形式帮你学习，督促你自己，给自己一个“健脑房”，那这个是不二的选择，没有什么投资比投资自己更有价值。目前的计划是100天服务499元，是培训班的五十分之一，这个价格几乎是做公益，全网找不到更低的。
      </view>
      <view class="mgb20">
        100
        天正好对应这个百天蜕变挑战，如果能坚持下来，你将成为一个能独立开发商业级产品的全栈工程师。
      </view>
      <view class="mgb20"
        >服务形式为线上，一期200人，人满启动，配两个私教轮班制，保证大部分时间都有人在线，如果私教中途未能履约，将进行更换，不影响学习者。</view
      >
      <view class="mgb20"
        >对了，如果你学有所成，那么未来你也可以再报名私教挣回来，不过一般来说那时候你的工资或者收入要比这个高多了。</view
      >
      <navigator url="/pages/index/qrcode?path=/images/ready1.jpg"
        ><button class="mgt40 ma" type="primary">私教服务群</button></navigator
      >
    </view>
  </view>
</template>

<script>
import cf from "../../utils/cf.js";

export default {
  data() {
    return {
      list: [],
    };
  },
  onLoad(options) {
    cf("getChallenges", {}, true).then((res) => {
      if (res) {
        this.list = res.data;
      }
    });
  },
  onShareAppMessage() {},
};
</script>
<style></style>
