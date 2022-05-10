<template>
	<div class="privacyState">
		<!-- nav -->
		<van-nav-bar title="账号隐私状态" left-text="返回" left-arrow @click-left="onClickLeft" />

		<van-cell center title="此账号可被他人查询">
			<template #right-icon>
				<van-switch v-model="checked" size="24" />
			</template>
		</van-cell>
	</div>
</template>

<script>
	export default {
		name: 'privacyState',
		data(){
			return {
				checked:true
			}
		},
		methods: {
			onClickLeft() {
				this.$router.push('/setting')
			}
		}
	}
</script>

<style>
</style>
