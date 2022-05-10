<template>
	<div class="collectPage">
		<!-- nav -->
		<van-nav-bar title="收藏" left-text="返回" left-arrow @click-left="onClickLeft" />
		<h2>收藏页面开发中..</h2>
	</div>
</template>

<script>
	export default {
		name: 'collectPage',

		methods: {
			onClickLeft() {
				this.$router.push('/setting')
			}
		},

  }
</script>

<style>
</style>
