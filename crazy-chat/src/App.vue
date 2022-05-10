  <template>
  <div class="app">
    <!--头部-->
    <chat-nav v-if="$route.meta.header"></chat-nav>
    <!--路由出口-->
    <router-view></router-view>
    <!--自己写的 空标签 目的：撑高度-->
    <div class="void"></div>
    <!--底部-->
    <van-tabbar v-model="active" v-if="$route.meta.footer">
      <van-tabbar-item to="/" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/addFriend" icon="friends-o">添加好友</van-tabbar-item>
      <van-tabbar-item to="/setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>


export default {
  name:'app',
  data() {
    return {
      active: 0,
    };
  },
  mounted() {
    if(this.active == 0) {
      if(this.$route.path != '/') {
        this.$router.replace('/')
      }
    }
    console.log(this.$store.state)
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.app {
  .void {
    width: 100%;
    height: 40px;
  }
}
</style>
