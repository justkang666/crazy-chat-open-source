<template>
	<div>
    <router-view v-if="$route.meta.isShow"></router-view>
    <div v-else>
      <van-notice-bar left-icon="volume-o" scrollable text="欢迎来到CrazyChat 加上你的好友畅所欲言吧" />
      <!--内容区域-->
      <div v-if="friendList.friends != undefined && friendList.friends.length > 0" >
        <chat-friend  v-for="item in friendList.friends" :key="item.crazyId" :info="item" ></chat-friend>
      </div>
      <div v-else class="friend_null">您还没有好友哦~.~</div>
    </div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name:'my-home',
  data() {
    return {
    }
  },
  computed:{
    ...mapGetters('user',['myInfo','friendList'])
  },
  methods:{

  },
  mounted(){
    this.$store.dispatch('user/getFriend')
    this.$store.dispatch('user/getInfo')
  }
}
</script>

<style lang="less" scoped>
.friend_null {
  height: 30px;
  line-height: 30px;
  color:red;
  text-align: center;
}
</style>
