<template>
  <div class="login">
    <div class="logo"><img src="/logo.png" alt=""></div>
    <h1>登陆</h1>
    <van-form @submit="onSubmit" >
      <van-field
          v-model="email"
          name="email"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ pattern, message: '邮箱格式不正确' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" >提交</van-button>
      </div>
      <p>没有账号？<router-link to="/register">点击此处注册</router-link></p>
      <p style="margin-top: 30px">密码居然忘了，<router-link to="/findPassword">点击找回</router-link></p>
    </van-form>
  </div>
</template>

<script>


export default {
  name: 'my-login',
  data() {
    return {
      email:'',
      password:'',
      pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    }
  },
  methods:{
    onSubmit(value){
      //  给store派发
      this.$store.dispatch('user/login',value)
    }
  }
}
</script>

<style scoped lang="less">
.login {
  .logo {
    margin-top: 50px;
    margin-bottom: 30px;
  }
  text-align: center;
  p {
    text-align: left;
    margin-left: 10px;
  }
}

</style>
