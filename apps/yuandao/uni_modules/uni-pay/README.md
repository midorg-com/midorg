## 简介

`uni-pay`为`uniCloud`开发者提供了简单、易用、统一的支付能力封装。让开发者无需研究支付宝、微信等支付平台的后端开发、无需为它们编写不同代码，拿来即用，屏蔽差异。

`uni-app`前端已经封装的全端支付 api `uni.requestPayment`，现在服务端也封装好了`uni-pay for uniCloud`，从此开发者可以极快的完成前后一体的支付业务。

目前已封装 App 端（微信支付和支付宝支付）、微信小程序、支付宝小程序的支付能力。

`uni-pay`是开源 sdk，可放心使用。本插件还包含示例工程，配置自己在微信和支付宝申请的相关配置后即可运行。

对于`uni-pay`还未封装的支付能力，欢迎大家在开源项目上提交pr，共同完善这个开源项目。

详细Api请参考：[uni-pay](https://uniapp.dcloud.io/uniCloud/unipay)

## 示例项目使用说明

1. 首先在`cloudfunctions/common/uni-config-center/uni-pay/config.js`内填写各个平台所需的配置。

**示例项目已集成[uni-id](https://ext.dcloud.net.cn/plugin?id=2116)，需在`cloudfunctions/common/uni-config-center/uni-id/config.json`内填写支付宝小程序、微信小程序登录相关信息**

如需开通对应平台的支付能力请参考以下文档

- [支付宝小程序开通支付](https://opendocs.alipay.com/mini/introduce/pay)
- [App接入支付宝支付](https://opendocs.alipay.com/open/204/105297/)
- [接入微信支付](https://pay.weixin.qq.com/index.php/apply/applyment_home/guide_normal#none)

**注意**

- 商户认证不支持个人类型的账号。
- 微信的App支付、小程序支付、H5支付是不同的体系。微信小程序支付在 微信商户平台 申请支付时，选择公众号支付；

2. 在`cloudfunctions`目录右键选择服务空间
3. 上传公用模块，公用模块用法请参考：[云函数公用模块](https://uniapp.dcloud.io/uniCloud/cf-common)
4. 上传所有云函数
5. 在`cloudfunctions/db_init.json`上右键初始化数据库
6. 在项目内的`manifest.json`内配置App端支付参数或者微信小程序appid，[manifest.json里配置App支付相关参数](https://uniapp.dcloud.io/api/plugins/payment?id=manifestjson%e9%87%8c%e9%85%8d%e7%bd%ae%e7%9b%b8%e5%85%b3%e5%8f%82%e6%95%b0)
7. 如果是运行到App端请使用云打包制作自定义基座来测试，其他平台直接运行即可

## 支付流程说明

下面的流程图很好的展示了示例项目的支付流程

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/uni-pay-flow-chart.jpg)