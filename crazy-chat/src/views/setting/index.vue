<template>
	<div class="setting">
		<!-- 路由出口 -->
		<router-view v-if="$route.meta.isShow"></router-view>
		<div class="setting-show" v-else>
			<!-- info 用户信息 start -->
			<van-cell is-link class="info" to="/setting/myInfo">
				<!-- 使用 title 插槽来自定义标题 -->
				<template #title>
					<div class="infoHead">
						<van-image width="100%" height="100%" :src="myInfo.viaUrl" />
					</div>
					<p class="infoName">{{myInfo.username}}</p>
					<p class="infoId">ID: {{myInfo.crazyId}}</p>
				</template>
			</van-cell>
			<!-- info end -->
			<!-- main 页面功能部分 start -->
			<main>
				<van-cell is-link :to="`/setting/changePassword?id=${myInfo.crazyId}`">
					<!-- 使用 title 插槽来自定义标题 -->
					<template #title>
						<van-icon name="smile" color="pink" />
						<span class="custom-title">修改密码</span>
					</template>
				</van-cell>
				<van-cell is-link to="/setting/servePage">
					<template #title>
						<van-icon name="wechat-pay" color="#1aa034" />
						<span class="custom-title">服务</span>
					</template>
				</van-cell>
				<van-cell is-link to="/setting/collectPage">
					<template #title>
						<van-icon name="bookmark" color="paleturquoise	" />
						<span class="custom-title">收藏</span>
					</template>
				</van-cell>
				<van-cell is-link to="/setting/friendCircle">
					<template #title>
						<van-icon name="coupon" color="green" />
						<span class="custom-title">朋友圈</span>
					</template>
				</van-cell>
				<van-cell is-link to="/setting/privacyState">
					<template #title>
						<van-icon name="coupon" color="purple" />
						<span class="custom-title">账号隐私状态</span>
					</template>
				</van-cell>

				<van-cell is-link class="setting" to="/setting/settingPage">
					<template #title>
						<van-icon name="setting" />
						<span class="custom-title">设置</span>
					</template>
				</van-cell>

        <div class="footer">
          <van-button type="danger" size="normal" block round @click="signOut">退出登录</van-button>
        </div>
			</main>
			<!-- main end -->
			<!-- footer 注销退出按钮 start -->

			<!-- footer end -->
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
	export default {
		name: 'my-setting',
		data() {
			return {
			}
		},
		methods: {
			vanSwitch(e) {
				e.stopPropagation()
			},
      signOut(){
        setTimeout(()=>{
          this.$notify('已退出')
          localStorage.clear('myInfo')
          localStorage.clear('crazytoken')
          this.$router.replace('/login')
        },500)
      }
		},
    computed:{
      ...mapGetters('user',['myInfo'])
    },
    mounted() {
      this.$store.dispatch('user/getInfo')
    }
  }
</script>

<style lang="less" scoped>
	.setting {
    margin-top: 10px;
		.van-cell {
			.van-icon {
				margin-right: 10px;
			}
		}
		.info {
			margin-top:6%;
			.van-icon {
				margin-top: 12%;
			}
			.infoHead {
				width: 60px;
				height: 60px;
				background-color: seashell;
				margin: 3% 5%;
				float: left;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.infoName {
				margin-top: 3%;
			}
			p {
				margin: 0;
				padding: 3px;
			}

		}
    main {
      .footer {
        width: 180px;
        margin: 20px auto;
      }
    }
	}
</style>
