let jwt = require("jsonwebtoken");
let Core = require("@alicloud/pop-core");
let smsClient = require("tencentcloud-sdk-nodejs").sms.v20210111.Client;

module.exports = async (args, db, openId, ctx) => {
  let {
    smsProvider, // 短信供应商
    content, // 内容
    smsType = "verify", // 类型
    signName, // 模板签名
    templateId, // 模板ID
    tencentAppId, // tencent的id
    keyId, // keyID
    keySecret, // 秘钥
  } = ctx.env;
  let { code, phoneNumber, type } = args;

  if (type === "send") {
    // 生成随机6位验证码
    code = "";
    for (let index = 0; index < 6; index++) {
      code = code + Math.floor(Math.random() * 10);
    }
    await db.collection("smsCode").add({
      _id: phoneNumber,
      code,
      createdAt: Date.now(),
    });
    switch (smsProvider) {
      case "aliyun":
        let ali = new Core({
          accessKeyId: keyId,
          accessKeySecret: keySecret,
          endpoint: "https://dysmsapi.aliyuncs.com",
          apiVersion: "2017-05-25",
        });
        return await ali.request(
          "SendSms",
          {
            PhoneNumbers: phoneNumber,
            SignName: signName,
            TemplateCode: templateId,
            TemplateParam:
              smsType === "verify" ? '{"code":"' + code + '"}' : content,
          },
          {
            method: "POST",
          }
        );

      case "tencent":
        let tt = new smsClient({
          credential: {
            secretId: keyId,
            secretKey: keySecret,
          },
          region: "ap-guangzhou",
          profile: {
            language: "zh-CN",
          },
        });
        let params = {
          SmsSdkAppId: tencentAppId,
          SignName: signName,
          ExtendCode: "",
          SenderId: "",
          SessionContext: "",
          PhoneNumberSet: [phoneNumber],
          TemplateId: templateId,
          TemplateParamSet: smsType === "verify" ? [code] : content,
        };
        return (tres = await tt.SendSms(params));

      default:
        throw Error("无供应商");
    }
  } else if (type === "login") {
    let codeData = await db.collection("smsCode").doc(phoneNumber).get();
    let sms = codeData.data[0];
    if (sms.code !== code) {
      throw Error("验证码错误");
    }
    if (Date.now() - sms.createdAt < 600000) {
      throw Error("验证码已失效");
    }
    // 查询一下用户，有就返回
    let user = await db
      .collection("user")
      .where({
        phoneNumber,
      })
      .get();
    if (user.data[0]) {
      let token =
        "Bearer " +
        jwt.sign(
          {
            userId: user.data[0]._id,
          },
          ctx.env.ADMIN_SECRET
        );
      return {
        user: user.data[0],
        token,
      };
    } else {
      let data = {
        phoneNumber,
        createdAt: Date.now(),
      };
      let userRes = await db.collection("user").add(data);
      let token =
        "Bearer " +
        jwt.sign(
          {
            userId: userRes.id,
          },
          ctx.env.ADMIN_SECRET
        );
      return {
        user: {
          ...data,
          _id: userRes.id,
        },
        token,
      };
    }
  }
};
