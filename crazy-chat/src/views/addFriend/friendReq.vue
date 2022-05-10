<template>
  <div>
    <van-nav-bar title="我的好友申请" left-text="返回" left-arrow @click-left="$router.push('/addFriend')" />
    <!--好友申请展示-->
    <chat-friendReq v-for="item in friendList.friends" :key="item.Fid" :friend="item"></chat-friendReq>
  </div>
</template>

<script>
import {getFriendList} from "@/api";

export default {
  name: "friendReq",
  data(){
    return {
      friendList:{}
    }
  },
  methods:{
    async getFriend(){
      let result = await getFriendList()
      if(result.code === '200') {
        this.friendList = JSON.parse(JSON.stringify(result.data));
      } else {
        this.$notify('网络错误')
      }
    },
  },
  mounted() {
    this.getFriend()
    // console.log(this.friendList)
  }
}
</script>

<style scoped lang="less">

</style>