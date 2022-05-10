<template>
  <div class="chat_frame" :class="`chat_${LR}`">
    <div class="chat_via"><img :src="myInfo.viaUrl" alt=""></div>
    <div class="chat_smg">
      <p>{{from.msg}}</p>
      <span class="time">{{from.time}}</span>
    </div>
  </div>
</template>

<script>
import {getFriendInfo} from "@/api";

export default {
  name: "chat-frame",
  props:["from"],
  data(){
    return {
      myInfo:{}
    }
  },
  methods:{
    async getInfo(){
      let result = await getFriendInfo(this.from.crazyId)
      if(result.code === '200') {
        this.myInfo = result.data
      } else{
        this.$notify(`${result.msg}`)
      }
    }
  },
  mounted() {
    this.getInfo()
  },
  computed:{
    LR(){
      const myId = JSON.parse(localStorage.getItem('myInfo')).crazyId
      if(myId == this.from.crazyId) {
        return 'right'
      } else {
        return 'left'
      }
    }
  }
}
</script>

<style scoped lang="less">
  .chat_frame {
    width: 100%;
    clear:both;
    .chat_via {
      float: left;
      width: 40px;
      height: 40px;
      //background: #66D9EF;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .chat_smg {
      float: left;
      width: 60%;
      min-height:40px;
      background: #e1e1e1;
      padding: 10px;
      border-radius: 10px;
      box-sizing: border-box;
      word-break:break-all;
      margin-left: 10px;
      margin-bottom: 10px;
      p {
        width: 100%;

      }
    }
  }
  .chat_right {
    .chat_via {
      float: right;
      margin-right: 20px;
    }
    .chat_smg {
      float: right;
      margin-right: 10px;
      background: rgba(94, 201, 76, 1);
      .time {
        color: #f2f2f2;
        font-size: 8px;
        float: right;
        margin-top: 10px;
      }
    }
  }
  .chat_left {
    .chat_via {
      float: left;
       margin-left: 20px;
    }
    .chat_smg {
      float: left;
      margin-right: 10px;
      .time {
        color: #2d2d2d;
        font-size: 8px;
        float: left;
        margin-top: 10px;
      }
    }
  }
</style>