<template>
  <section >
    <div class="userHead">
      <img alt="" :src="friendInfo.viaUrl" />

    </div>
    <div class="info">
      <p class="userName">{{friendInfo.username}}</p>
    </div>
    <div v-if="sendShow">
      <div v-if="friend.state === 0">
        <van-button icon="plus" color="green" round size="small" @click="agree()">同意</van-button>
        <van-button icon="cross"  round size="small" type="danger" @click="refuse()">拒绝</van-button>
      </div>
      <div v-else>
        <van-button v-if="friend.state === 1" color="green"  size="small">已同意</van-button>
        <van-button v-if="friend.state === 2" color="red"  size="small">已拒绝</van-button>
      </div>
    </div>
    <div v-else><van-button size="small" >{{showMsg}}</van-button></div>
  </section>
</template>

<script>
import {getFriendInfo,updateFriend} from "@/api";

export default {
  name: "chat-friendReq",
  props:['friend'],
  data(){
    return {
      friendInfo: {},
    }
  },
  methods:{
    async changeState(state){
      let result = await updateFriend(this.friendInfo.crazyId,state)
      if(result.code === '200') {
        this.$notify({
          type:'success',
          message:'操作成功'
        })
      } else {
        this.$notify({
          type:'warning',
          message:`${result.msg}`
        })
      }
    },
    async getInfo(){
      let result = await getFriendInfo(this.friend.friendId)
      // console.log(result)
      if(result.code === '200') {
        this.friendInfo = result.data
      } else {
        this.$notify(`${this.result.msg}`)
      }
    },
    agree(){
      this.changeState(1)
    },
    refuse() {
      this.changeState(2)
    }
  },
  mounted() {
    // console.log(this.friend,this.sendShow)
    this.getInfo()
  },
  computed:{
    sendShow(){
      return this.friend.friendId === this.friend.sendId
    },
    showMsg(){
      if(this.friend.state === 0) {
        return '等待对方验证中...'
      } else if(this.friend.state === 1) {
        return '对方已通过好友验证'
      } else {
        return '对方已拒绝好友验证'
      }
    }
  }
}
</script>

<style scoped lang="less">
section {
  width: 100%;
  height: 70px;
  background-color: #f3f3f3;
  border-bottom: 1px solid #ccc;
  .userHead {
    width: 50px;
    height: 50px;
    float: left;

    img {
      width: 100%;
      height: 100%;
      background-color: #7c7c7c;
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
    margin: 18px 20px;
  }
}

section:nth-last-child(1) {
  border: none;
}
</style>