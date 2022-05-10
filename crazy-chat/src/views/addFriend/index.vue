<template>
	<div class="search">
    <router-view v-if="$route.path == '/addFriend/friendReq'"></router-view>
    <div v-else>
      <!--好友申请页-->
      <van-cell is-link to="/addFriend/friendReq">
        <template #title>
          <van-icon name="friends" color="blue"/>
          <span class="custom-title">我的好友申请</span>
        </template>
      </van-cell>
      <!--搜索框-->
      <van-search v-model="val" show-action label="" input-align="center" placeholder="请输入好友名称进行查询"
                  @search="onSearch">
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <!--展示区域 -- 无内容 || 未查到内容-->
      <div v-if="userList.length > 0" class="content">
        <!-- <p v-for="(item,index) in userList" :key="index">{{item}}</p> -->
        <!-- 查找信息展示区 -->
        <section v-for="(item,index) in userList" :key="index">
          <div class="userHead">
            <img :src=item.viaUrl />
          </div>
          <div class="info">
            <p class="userName">{{item.username}}</p>
            <p class="userSing">{{item.sing}}</p>
          </div>
          <van-button icon="plus" color="green" size="small" @click="addFriendBtn(item.crazyId)">添加</van-button>
        </section>
        <!--  -->
      </div>
      <van-empty v-else image="search" description="查找好友名称吧" />
    </div>
	</div>
</template>

<script>
	import {
		getUserList,reqAddFriend
	} from '@/api'
	export default {
		name: 'my-addFriend',
		data() {
			return {
				val: '',
				userList: []
			}
		},
		methods: {
			async findUser() {
				let result = await getUserList({
					username: this.val
				})
				// console.log((result))
				if (result.code === '200') {
					this.userList = result.data
				} else {
					this.val = ''
					this.userList = []
					this.$notify('未查询到结果')
				}
			},
			onSearch() {
				this.findUser()
			},
			// 添加好友点击事件
			async addFriendBtn(id) {
        let myId = JSON.parse(localStorage.getItem('myInfo')).crazyId
        if(id === myId) {
          this.$notify('您不可以加自己为好友哦')
          return
        }
        let result = await reqAddFriend({friendId:id})
        console.log(result)
        if(result.code == '200') {
          this.$notify({
            type:'success',
            message:'已添加，等待对方同意'
          })
        } else if(result.code == '401' && result.msg == '请先登录'){
          this.$notify({
            type:'danger',
            message:'请重新登录'
          })
          localStorage.clear('crazytoken')
          this.$router.push('/login')
        } else {
          this.$notify({
            type:'danger',
            message:`${result.msg}`
          })
        }
			}
		}
	}
</script>

<style scoped lang="less">
	section {
		width: 100%;
		height: 70px;
		//background-color: #bac6ec;
		border-bottom: 1px solid gainsboro;

		.userHead {
			width: 50px;
			height: 50px;
			float: left;

			img {
				width: 100%;
				height: 100%;
				background-color: blue;
				margin: 10px;
			}
		}

		.info {
			float: left;
			margin: 10px;
			margin-left: 20px;

			p {
				margin: 3px;
			}
			.userName {
				font-size: 16px;
			}
			.userSing {
				font-size: 12px;
				color: gray;
			}
		}

		button {
			float: right;
			margin: 18px;
		}
	}

	section:nth-last-child(1) {
		border: none;
	}

	.van-icon-friends {
		margin-right: 10px;
	}
</style>
