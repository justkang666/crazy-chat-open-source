<template>
	<div class="servePage">
		<!-- nav -->
		<van-nav-bar title="服务" left-text="返回" left-arrow @click-left="onClickLeft" />
		<main>
      <h3>我的设备信息</h3>
      <br>
      <hr>
      <br>
      <p>设备系统:<span>{{nav.platform}}</span></p>
      <p>登录地址:<span>{{addrInfo.cname}}</span></p>
    </main>
	</div>
</template>

<script>
import Api from 'axios'
	export default {
		name: 'servePage',
    data(){
      return {
        nav:{},
        addrInfo:{}
      }
    },
		methods: {
			onClickLeft() {
				this.$router.push('/setting')
			}
		},
    mounted() {
      Api.get('/apis/cityjson?ie=utf-8' ,{}).then(res => {
        // console.log(res.data);
        let info = JSON.parse(res.data.split('=')[1].slice(0,-1))
        this.addrInfo = info
      })
      this.nav = navigator
      // console.log(navigator)
    },

	}
</script>

<style lang="less" scoped="scoped">
	main {
    padding: 10px;
		margin-top: 20px;
    span {
      color: #7c7c7c;
    }
    p {
      margin: 5px;
    }
	}
</style>
