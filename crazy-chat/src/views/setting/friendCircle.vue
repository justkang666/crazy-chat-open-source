<template>
	<div class="friendCircle">
		<!-- nav -->
		<van-nav-bar title="朋友圈" left-text="返回" left-arrow @click-left="onClickLeft" />
		<h2>朋友圈开发中..</h2>
	</div>
</template>

<script>
	export default {
		name: 'friendCircle',
		methods: {
			onClickLeft() {
				this.$router.push('/setting')
			}
		}
	}
</script>

<style>
</style>
