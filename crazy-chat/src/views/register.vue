<template>
	<div class="register">
    <div class="logo"><img src="/logo.png" alt=""></div>
		<h1>注册</h1>
		<van-form>
			<van-field v-model="username" name="username" label="用户名" placeholder="用户名"
				:rules="[{ validator, message: '用户名不成立' }]" />

			<van-field v-model="email" name="email" label="邮箱" placeholder="邮箱"
				:rules="[{ pattern, message: '邮箱格式不正确' }]" />

			<van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
				:rules="[{ required: true, message: '请填写密码' }]" />
			<van-field v-model="code" center clearable label="邮箱验证码" placeholder="请输入邮箱验证码" name="emailCode">/
				<template #button>
					<van-button size="small" type="primary" @click='sendCode'>发送验证码</van-button>
				</template>
			</van-field>

			<div style="margin: 16px;">
				<van-button round block type="info" native-type="submit" @click='registerSub'>提交</van-button>
			</div>
			<p>已有账号，<router-link to="/login">点击此处登陆</router-link>
			</p>
		</van-form>
	</div>
</template>

<script>
	import {
		getVerifyCode,
		subRegister
	} from '@/api/index.js'

	export default {
		name: 'my-register',
		data() {
			return {
				username: '',
				email: '',
				password: '',
				code: '',
				pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
			}
		},
		methods: {
			// 通过 validator 进行正则校验
			validator(val) {
				return /^[a-zA-Z0-9\u4E00-\uFA29_-]{2,16}$/.test(val);
			},
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
				if (this.email != '' && this.username != '' && this.password != '' && this.code != '') {
					let result = await subRegister({
						username: this.username,
						email: this.email,
						password: this.password,
						emailCode: this.code,
					})
					if (result.code == '200') {
						this.$notify({
							type:'success',
							duration: 2000,
							message: '注册成功！'
						})
						this.$router.push('/login')
					} else {
						this.$notify({
							duration: 2000,
							message: '请检查内容是否有误或邮箱账号已存在'
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
