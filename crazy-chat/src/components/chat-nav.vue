<template>
  <div class="chat_nav">
    <van-nav-bar left-arrow>
      <template #title> Crazy Chat </template>
      <template #left>
        <figure class="nav_avatar">
          <img width="100%" height="100%" :src="myInfo.viaUrl" alt="" />
        </figure>
        <div class="nav_font">
          <span class="nav_font_username">{{ myInfo.username }}</span>
          <span class="nav_font_sign">{{ myInfo.sing }}</span>
        </div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "chat-nav",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("user/getInfo");
  },
  computed: {
    ...mapGetters("user", ["myInfo"]),
  },
};
</script>

<style scoped lang="less">
.chat_nav {
  .van-nav-bar {
    .van-nav-bar__left,
    .van-nav-bar__right {
      position: static;
    }
    background: rgba(132, 250, 176, 1);
    .nav_avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .nav_font {
      text-align: left;
      margin-left: 10px;
      font-size: 12px;
      span {
        display: block;
        height: 18px;
      }
      .nav_font_sign {
        color: rgb(165, 160, 160);
        font-size: 9px;
      }
    }
  }
}
</style>
