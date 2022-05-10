<template>
	<div class="myInfo">
		<van-nav-bar title="个人信息" left-text="返回" left-arrow @click-left="onClickLeft" />
		<!-- infoHead -->
		<header>
			<p>头像</p>
			<div class="headImg" @click='chengeVia()'>
				<van-image round width="50px" height="100%" :src="myInfo.viaUrl" />
				<van-icon name="arrow" />
			</div>
      <van-dialog v-model="viashow" title="修改头像" show-cancel-button @confirm="fn2()">
        <van-uploader v-model="fileList" multiple max-count="1" :after-read="afterRead"/>

      </van-dialog>
		</header>
		<!--  -->
		<main>
			<van-cell :title="index" v-for="(item,index) in myInfoGet" :value='item' :key="index" size="large"
				is-link @click='changeInfo(item,index)'/>
			<van-dialog v-model="show" title="修改当前信息(限制12字符)" show-cancel-button @confirm="fn1()">
				<van-cell-group >
					<van-field label="修改为" v-model="showText"  maxlength="12"/>
				</van-cell-group>
			</van-dialog>
		</main>
	</div>
</template>

<script>
import  {mapGetters} from "vuex";
import {updateUser,reqFile} from "@/api";

export default {
		name: 'myInfo',
		data() {
			return {
				show: false,
        viashow: false,
				showText: '',
        showAttr:'',
        fileList:[]
			}
		},
		methods: {
			onClickLeft() {
				this.$router.push('/setting')
			},
			changeInfo(item,index) {
        if(index == 'regTime' || index=='email'|| index=='crazyId') {
          this.$notify(`${index}暂时不可修改`)
          return
        }
				this.show = true
        this.showAttr = index
				this.showText = item
			},
      //点击头像信息
      chengeVia(){
        this.viashow = true
      },
      //图片上传后
      async afterRead(file){
        console.log(file)
        let result = await reqFile(file.content)
        console.log(result)
        if(result.code == '200') {
          this.$notify({
            type:'success',
            message:'更换成功',
          })
          this.$store.dispatch('user/getInfo')
        } else {
          this.$notify('更换失败')
        }
      },
      fn2(){
        this.viashow = false
        console.log(1)
        this.$store.dispatch('user/getInfo')
      },
      fn1(){
        // console.log(this.showAttr,this.showText)
        let data = {}
        data[this.showAttr] = this.showText
        this.update(data)
      },
      async update(data){
        let result = await updateUser(data)
        if(result.code =="200" ) {
          this.$notify({
            type:'success',
            message:'修改成功'
          })
          await this.$store.dispatch('user/getInfo')
        } else {
          this.$notify('修改失败')
        }
      }
		},
    computed:{
      ...mapGetters('user',['myInfo']),
      myInfoGet(){
        let info = this.myInfo
        if(info.regTime) {
          info.regTime = info.regTime.slice(0,10)
        }

        delete info.viaUrl
        // console.log(info)
        return info
      }
    },
  mounted() {
    this.$store.dispatch('user/getInfo')
  }

}
</script>

<style scoped lang="less">
	header {
		width: 100%;
		height: 80px;
		// background-color: #66D9EF;

		p {
			float: left;
			line-height: 50px;
			margin-left: 15px;
		}

		.headImg {
			width: 100px;
			height: 50px;
			float: right;
			margin: 15px 0px;

			.van-image,
			.van-icon {
				float: left;
			}

			.van-icon {
				margin-top: 16px;
				margin-left: 15px;
			}
		}
	}

	main {
		.van-dialog {
			input {}
		}
	}
</style>
