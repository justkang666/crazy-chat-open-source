<template>
  <div class="register">
    <div class="logo"><img src="/logo.png" alt=""></div>
    <h1>找回密码</h1>
    <van-form>
      <van-field v-model="email" name="email" label="邮箱" placeholder="邮箱"
                 :rules="[{ pattern, message: '邮箱格式不正确' }]" />
      <van-field v-model="password" type="password" name="password" label="新密码" placeholder="请填写新密码"
                 :rules="[{ required: true, message: '请填写新密码' }]" />
      <van-field v-model="code" center clearable label="邮箱验证码" placeholder="请输入邮箱验证码" name="emailCode">/
        <template #button>
          <van-button size="small" type="primary" @click='sendCode'>发送验证码</van-button>
        </template>
      </van-field>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" @click='registerSub'>立即修改</van-button>
      </div>
      <p>哈哈哈又想起密码了，<router-link to="/login">点击此处登陆</router-link>
      </p>
    </van-form>
  </div>
</template>

<script>
import {
  getVerifyCode,
  findPassword
} from '@/api/index.js'

export default {
  name: 'findPassword',
  data() {
    return {
      email: '',
      password: '',
      code: '',
      pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
    }
  },
  methods: {
    async sendCode() {
      if (this.email != '') {
        let result = await getVerifyCode({
          email: this.email,
        })
        if (result.code == '200') {
          this.$notify({
            type:'success',
            duration: 2000,
            message: '已发送验证码'
          })
        } else {
          this.$notify({
            duration: 2000,
            message: '验证码发送失败，请重试'
          })
        }
        console.log(result)
      }
    },
    async registerSub() {
      if (this.email != '' && this.password != '' && this.code != '') {
        let result = await findPassword({
          email: this.email,
          password: this.password,
          emailCode: this.code,
        })
        if (result.code == '200') {
          this.$notify({
            type:'success',
            duration: 2000,
            message: '修改成功！'
          })
          this.$router.push('/login')
        } else {
          this.$notify({
            duration: 2000,
            message: '请检查邮箱是否正确'
          })
        }
        console.log(result)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  text-align: center;
  .logo {
    margin-top: 50px;
    margin-bottom: 30px;
  }
  p {
    margin-left: 10px;
    text-align: left;
  }
}
</style>
