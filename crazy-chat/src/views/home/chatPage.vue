<template >
  <div class="chat_page" ref="main">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="$router.push('/')"
      fixed
    >
      <template #title>
        <div class="page_title">
          <span class="state"></span>
          <p>{{ friendList.username }}</p>
        </div>
      </template>
    </van-nav-bar>
    <!--空标签-->
    <div class="void"></div>
    <!--聊天内容主体-->
    <div ref="main" style="height: 100%">
      <chat-frame
        v-for="item in friendChatList.chatList"
        :key="item.time"
        :from="item"
      ></chat-frame>
    </div>
    <!--空标签-->
    <div class="void"></div>
    <div class="void"></div>
    <div class="page_send" @keyup.enter="sendMsg()">
      <van-field rows="1" autosize type="textarea" v-model="sendValue">
        <template #button>
          <van-button size="small" type="primary" @click="sendMsg()"
            >发送消息</van-button
          >
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import { getChatList } from "@/api";

export default {
  name: "chatPage",
  data() {
    return {
      sendValue: "",
      friendChatList: {},
      friendList: {},
    };
  },
  methods: {
    async chatList() {
      let Fid = JSON.parse(localStorage.getItem("friendList")).Fid;
      let result = await getChatList(Fid);
      if (result.code === "200") {
        this.friendChatList = result.data;
      } else {
        this.$notify(`${result.msg}`);
      }
    },
    sendMsg() {
      if (this.sendValue.trim("") === "") {
        this.$notify("发送内容不能为空");
        return;
      }
      let info = JSON.parse(localStorage.getItem("myInfo"));
      console.log(this.friendList.Fid);
      this.$socket.emit("sendMsg", {
        msg: this.sendValue,
        Fid: this.friendList.Fid,
        sendId: info.crazyId,
      });
      this.sendValue = "";
      this.chatList();
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight + 100);
      }, 500);
    },
  },
  created() {
    if (this.$route.params.Fid) {
      localStorage.setItem("friendList", JSON.stringify(this.$route.params));
    }
    this.friendList = JSON.parse(localStorage.getItem("friendList"));

    //监听事件
    this.sockets.subscribe(`${this.friendList.Fid}`, (ok) => {
      console.log("接受到", ok);
      this.chatList();
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight + 100);
      }, 500);
    });
  },
  mounted() {
    this.chatList();
    this.$nextTick(() => {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 500);
    });
  },
};
</script>

<style scoped lang="less">
.chat_page {
  .void {
    width: 100%;
    height: 55px;
  }
  .page_title {
    .state {
      width: 8px;
      height: 8px;
      float: left;
      display: block;
      border-radius: 50%;
      background: green;
      margin: 6px;
    }
    p {
      float: left;
      color: #484848;
      font-size: 16px;
    }
  }
  .page_send {
    position: fixed;
    bottom: 0;
    width: 100%;
    .van-field {
      background: rgb(255, 255, 255);
      border-top: 1px solid rgb(223, 223, 223);
    }
  }
}
</style>
