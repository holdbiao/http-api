<template>
  <div class="header-wrapper">
    <van-row class="search-bar">
      <van-col :span="3" class="location-cont">
        <i class="iconfont icon">&#xe633;</i>
      </van-col>
      <van-col :span="16">
        <input type="text" class="search-input" placeholder="请输入关键字">
      </van-col>
      <van-col :span="5" class="btn-cont">
        <van-button size="mini">查找</van-button>
      </van-col>
    </van-row>
    <div class="swipe-wrapper">
      <van-swipe :autoplay="2000">
        <van-swipe-item
          v-for="(item, index) in bannerPicArray"
          :key="'swipeitem' + index">
          <img :src="item.imageUrl" :alt="index">  
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>{{this.shopList}}</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        shopList: null,
        msg: 'shopping mall',
        bannerPicArray: [
            {imageUrl:'http://img4.imgtn.bdimg.com/it/u=2104801820,2623271160&fm=11&gp=0.jpg'},
            {imageUrl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3965727738,3785533136&fm=26&gp=0.jpg'},
            {imageUrl:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=126290251,340250522&fm=26&gp=0.jpg'}
        ]
      }
    },
    async created () {
      let res = await this.$http.shop.shopList()
      this.shopList = res.data.data
      // // 防止重复请求
      // for (let i=0; i<10; i++) {
      //   this.$http.shop.shopList().then(res =>{
      //     this.shopList = res.data.data
      //   })
      // }
    }
  }
</script>

<style lang='scss' scoped>
.header-wrapper {
  .search-bar {
    line-height: 2rem;
    background-color: deeppink;
    .location-cont {
      line-height: 2rem;
      text-align: center;
      .icon {
        color: #fff;
        font-size: 1.5rem;
      }
    }
    .search-input {
      width: 100%;
      height: 1.5rem;
      border: none;
      color: #fff;
      border-bottom: 1px solid #fff;
      background: none;
      &::placeholder {
        color: #fff;
        opacity: .5;
      }
    }
    .btn-cont {
      text-align: center;
    }
  }
  .swipe-wrapper {
    height: 10rem;
    .van-swipe {
      height: 100%;
      .van-swipe-item {
        height: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>