<template>
  <view class="content">
    <input v-model="userName" placeholder="用户名" />
    <input v-model="password" type="safe-password" placeholder="密码" />
    <button @click="userLogin()">密码登录</button>
    <input v-model="phoneNumber" placeholder="手机号" />
    <button @click="sendCode()">发送验证码</button>
    <input v-model="code" placeholder="验证码" />
    <button @click="smsLogin()">手机登录</button>

    <button type="primary" @click="wxLogin()">wx登录</button>
    <button type="primary" @click="appleLogin()">苹果登录</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        userName: '',
        password: '',
        phoneNumber: '',
        code: '',
        email: '',
      }
    },
    onLoad() {

    },
    methods: {
      userLogin() {
        this.login('loginWithUser', {
          userName: this.userName,
          password: this.password
        })
      },
      sendCode() {
        this.login('loginWithSms', {
          phoneNumber: this.phoneNumber,
          type: 'send'
        })
      },
      smsLogin() {
        this.login('loginWithSms', {
          phoneNumber: this.phoneNumber,
          code: this.code,
          type: 'login'
        })
      },
      login(api, data) {
        uniCloud.callFunction({
          name: 'fun',
          data: {
            api,
            args: data
          }
        }).then(({
          result
        }) => {
          if (result.data.token) {
            uni.setStorageSync('token', result.data.token)
            uni.showToast({
              title: "登录成功"
            })
          }
        }).catch(e => {
          uni.showToast({
            title: "登录失败",
            icon: 'error'
          })
        })
      },
      wxLogin() {
        uni.login({
          provider: 'weixin',
          onlyAuthorize: true
        }).then(({
          code
        }) => {
          this.login('loginWithAppWx', code)
        })
      },
      appleLogin() {
        uni.login({
          provider: 'apple',
        }).then(result => {
          uni.getUserInfo({
            provider: 'apple'
          }).then(info => {
            this.login('loginWithApple', {
              info,
              result
            })
          })
        })
      }
    }
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
