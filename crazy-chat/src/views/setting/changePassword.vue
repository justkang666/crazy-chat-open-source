<template>
	<div class="change-pass">
		<!-- nav -->
		<van-nav-bar title="修改密码" left-text="返回" left-arrow @click-left="onClickLeft" />
		<!--  -->
		<main>

			<van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
				请输入正确的账号和密码并适当提高密码的难度等级,以防被盗.
			</van-notice-bar>

			<van-cell-group>
				<van-field label="用户 id" :value="`${$route.query.id}`" readonly />
				<van-field v-model="newPassword" label="新密码" type="password" placeholder="请输入新密码" />
				<van-field v-model="passwordVerify" label="验证新密码" type="password" placeholder="请再次输入新密码" />
			</van-cell-group>
			<!-- button -->
			<van-button plain type="primary" @click='subPass'>修改密码</van-button>
		</main>
	</div>
</template>

<script>
import {updateUser} from "@/api";

export default {
		name: 'changePassword',
		data() {
			return {
				newPassword: '',
				passwordVerify: ''
			}
		},
		methods: {
			onClickLeft() {
				this.$router.push('/setting')
			},
      async changePass(){
        let result = await updateUser({password:this.newPassword})
        console.log(result)
        if(result.code === '200') {
          this.$notify({
            type:'success',
            message:'修改成功，请重新登陆'
          })

          setTimeout(()=>{
            localStorage.clear('myInfo')
            localStorage.clear('crazytoken')
            this.$router.push('/login')
          },1000)
        } else {
          this.$notify(`${result.msg}`)
        }
      },
			subPass() {
				if (this.newPassword !== '' && this.passwordVerify !== '') {
					if (this.newPassword === this.passwordVerify) {
            this.changePass()
					} else {
						this.$notify({
							duration: 1000,
							message: '请检查密码是否一致'
						})
					}
				} else {
					this.$notify({
						duration: 2000,
						message: '输入信息不能为空'
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	main {
		margin-top: 20px;
	}

	.van-button {
		margin-top: 50px;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
