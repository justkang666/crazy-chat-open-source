<template>
  <van-swipe-cell>
    <template #left>
      <van-button square type="primary" text="特别提醒" class="friend_button" />
    </template>
    <div class="friend" @click="toChatPage()">
      <img class="friend_avatar" :src="myInfo.viaUrl" alt="" />
      <div class="friend_font">
        <span class="friend_font_username"
          >{{ myInfo.username }} <span>{{ chatInfo.time }}</span></span
        >
        <br />
        <p class="friend_font_msg"></p>
        <span class="friend_font_msg">{{ chatInfo.msg }}</span>
      </div>
    </div>
    <template #right>
      <van-button square type="danger" text="删除" class="friend_button" />
    </template>
  </van-swipe-cell>
</template>

<script>
import { getFriendInfo, getChatList } from "@/api";

export default {
  name: "chat-friend",
  props: ["info"],
  data() {
    return {
      myInfo: {},
      chatInfo: {},
    };
  },
  methods: {
    toChatPage() {
      this.$router.push({
        name: "chatPage",
        params: {
          username: this.myInfo.username,
          Fid: this.info.Fid,
          viaUrl: this.myInfo.viaUrl,
        },
      });
    },
    async getMyInfo() {
      let result = await getFriendInfo(this.info.friendId);
      if (result.code === "200") {
        this.myInfo = result.data;
      }
    },
    async getChatInfo() {
      let result = await getChatList(this.info.Fid);
      if (result.code === "200") {
        result = result.data.chatList[result.data.chatList.length - 1];
        this.chatInfo = result;
        this.chatInfo.time = this.chatInfo.time.slice(9);
      }
    },
  },
  mounted() {
    this.getMyInfo();
    this.getChatInfo();
  },
};
</script>

<style scoped lang="less">
.van-swipe-cell {
  //background: #ccc;
  .friend_button {
    height: 100%;
  }
  .friend {
    height: 50px;
    padding: 10px;

    .friend_avatar {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      float: left;
    }
    .friend_font {
      width: 80%;
      height: 100%;
      border-bottom: 1px solid #ccc;
      float: left;
      margin-left: 10px;
      .friend_font_username {
        font-size: 16px;
        span {
          float: right;
          font-size: 12px;
        }
      }
      .friend_font_msg {
        margin-top: 6px;
        font-size: 12px;
        color: #515151;
      }
    }
  }
}
</style>