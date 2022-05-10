<template>
	<div class="settingPage">
		<!-- nav -->
		<van-nav-bar title="设置" left-text="返回" left-arrow @click-left="onClickLeft" />
		
		<main>
			<van-cell title="关于crazy-chat" is-link @click="alert" />
			<van-cell title="帮助与反馈" is-link />
		</main>
	</div>
</template>

<script>
	export default {
		name: 'settingPage',
		methods: {
			onClickLeft() {
				this.$router.push('/setting')
			},
			alert(){
				this.$notify({
            type:'success',
            message:'crazy-chat yyds!'
          })
			}
		}
	}
</script>

<style>
</style>
