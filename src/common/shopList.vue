<template>
 <div>
   <header id='head_top'>
     <!--<section class="head_goback"  @click="$router.go(-1)">-->
       <!--<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">-->
         <!--<polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>-->
       <!--</svg>-->
     <!--</section>-->
     <section class="title_head ellipsis" v-if="shopListTitle">
       <span class="title_text">{{shopListTitle}}</span>
     </section>
   </header>
   <div class="shop_list_container">
     <header class="shop_header">
       <svg class="shop_icon">
         <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
       </svg>
       <span class="shop_header_title">附近商家</span>
     </header>
   </div>
   <div class="shoplist_container">
     <!--<ul v-load-more="loaderMore" v-if="shopListArr.length" type="1">-->
     <ul  v-if="shopListArr.length" type="1">
       <!--<router-link :to="{path: 'shop', query:{geohash, id: item.id}}" v-for="item in shopListArr" tag='li' :key="item.id" class="shop_li">-->
       <a  @click="shopDetail(item)" class="ordercard" v-for="item in shopListArr" tag='li' :key="item.id" class="shop_li">
         <section>
           <!--<img v-if="item.shopIcon&&item.shopIcon.length>0" :src="item.shopIcon" width="120"/>-->
           <!--<img :src="imgBaseUrl + item.image_path" class="shop_img">-->
           <img v-if="item.shopIcon&&item.shopIcon.length>0" :src="item.shopIcon" class="shop_img"/>
         </section>
         <hgroup class="shop_right">
           <header class="shop_detail_header">
             <!--<h4 :class="item.is_premium? 'premium': ''" class="" class="shop_title ellipsis">{{item.name}}</h4>-->
             <h4 :class="is_premium? 'premium': ''" class="" class="shop_title ellipsis">{{item.shopName}}</h4>
             <ul class="shop_detail_ul">
               <!--<li v-for="item in item.supports" :key="item.id" class="supports"></li>-->
               <li class="supports">保</li><li class="supports">准</li><li class="supports">票</li>
             </ul>
           </header>
           <h5 class="rating_order_num">
             <section class="rating_order_num_left">
               <section class="rating_section">
                 <!--<rating-star :rating='item.rating'></rating-star>-->
                 <star :size="36" :score="item.shopScore"></star>
                 <span class="rating_num">{{item.shopScore}}</span>
               </section>
               <section class="order_section">
                 <!--月售{{item.recent_order_num}}单-->
                 月售<span>{{parseInt(Math.random()*500,10)+1}}</span>单
               </section>
             </section>
             <section class="rating_order_num_right">
               <span class="delivery_style delivery_left" v-if="delivery_mode">蜂鸟专送</span>
               <span class="delivery_style delivery_right" v-if="supports">准时达</span>
             </section>
           </h5>
           <h5 class="fee_distance">
             <p class="fee">
               <!--¥{{item.float_minimum_order_amount}}起送-->
               ¥20起送
               <span class="segmentation">/</span>
               配送费约¥2
               <!--{{item.piecewise_agent_fee.tips}}-->
             </p>
             <p class="distance_time">
							<!--<span v-if="Number(item.distance)">{{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}-->
								<!--<span class="segmentation">/</span>-->
							<!--</span>-->
               <!--<span v-else>{{item.distance}}</span>-->
               <span>{{parseInt(Math.random()*1000,10)+1}}m</span>
               <span class="segmentation">/</span>
               <span class="order_time">{{parseInt(Math.random()*60,10)+1}}分钟</span>
               <!--<span class="order_time">{{item.order_lead_time}}</span>-->
             </p>
           </h5>
         </hgroup>
       <!--</router-link>-->
       </a>
     </ul>
     <!--<ul v-else class="animation_opactiy">-->
     <!--<li class="list_back_li" v-for="item in 10" :key="item">-->
     <!--<img src="../../images/shopback.svg" class="list_back_svg">-->
     <!--</li>-->
     <!--</ul>-->
     <!--<p v-if="touchend" class="empty_data">没有更多了</p>-->
     <!--<aside class="return_top" @click="backTop" v-if="showBackStatus">-->
     <!--<svg class="back_top_svg">-->
     <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>-->
     <!--</svg>-->
     <!--</aside>-->
     <!--<div ref="abc" style="background-color: red;"></div>-->
     <!--<transition name="loading">-->
     <!--<loading v-show="showLoading"></loading>-->
     <!--</transition>-->
   </div>
 </div>

</template>

<script>
  // import headTop from 'src/components/header/head'
  // import {mapState} from 'vuex'
  // import {shopList} from 'src/service/getData'
  // import {imgBaseUrl} from 'src/config/env'
  // import {showBack, animate} from './mUtils'
  // import {loadMore, getImgPath} from './mixin'
  // import loading from './loading'
  // import ratingStar from './ratingStar'
  import star from 'components/star/star';
  const ERR_OK = 0;
  export default {
    data(){
      return {
        offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
        shopListArr:[], // 店铺列表数据
        shopListTitle: '北京理工大学珠海学院',
        delivery_mode:true,
        supports:true,
        is_premium:true,
        // preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
        // showBackStatus: false, //显示返回顶部按钮
        // showLoading: true, //显示加载动画
        // touchend: false, //没有更多数据
        // imgBaseUrl,
      }
    },

    components: {
      star
     // headTop,
      //ratingStar,
    },
    computed: {
      // ...mapState([
      //   'latitude','longitude'
      // ]),
    },
    updated(){
      // console.log(this.supportIds, this.sortByType)
    },
    created() {
    // , {params: {'openid': getCookie('openid')}}
      this.$http.get('/sell/buyer/shop/list').then((response) => {
        response = response.body;
        if (response.code === ERR_OK) {
          this.shopListArr =  response.data;
        }
      });
    },
    methods: {
      shopDetail: function (item) {
        window.shopId=item.id;
        location.href = '/#/goods/';
      }
    },
     watch: {
    //   //监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
    //   restaurantCategoryIds: function (value){
    //     this.listenPropChange();
    //   },
    //   //监听父级传来的排序方式
    //   sortByType: function (value){
    //     this.listenPropChange();
    //   },
    //   //监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
    //   confirmSelect: function (value){
    //     this.listenPropChange();
    //   }
     }
  }
</script>

<style lang="less" scoped>
  /*@import 'src/style/mixin';*/

  .shop_list_container{
    margin-top: 1rem;
    border-top: 0.025rem solid #e4e4e4;
    background-color: #fff;
    .shop_header{
      .shop_icon{
        fill: #999;
        margin-left: 0.6rem;
        vertical-align: middle;
      /*@include wh(0.6rem, 0.6rem);*/
        width: 0.6rem;
        height:0.6rem;
      }
      .shop_header_title{
        color: #999;
      /*@include font(0.55rem, 1.6rem);*/
        font: 0.55rem/1.6rem Microsoft YaHei;
      }
    }
  }

  .shoplist_container{
    background-color: #fff;
    margin-bottom: 2rem;
    margin-top: 10px;
  }
  .shop_li{
    display: flex;
    border-bottom: 0.025rem solid #f1f1f1;
    padding: 0.7rem 0.4rem;
  }
  .shop_img{
    /*@include wh(2.7rem, 2.7rem);*/
    width: 2.7rem;
    height: 2.7rem;
    display: block;
    margin-right: 0.4rem;
  }
  .list_back_li{
    height: 4.85rem;
    .list_back_svg{
      /*@include wh(100%, 100%)*/
      width: 100%;
      height: 100%;
    }
  }
  .shop_right{
    flex: auto;
    .shop_detail_header{
      /*@include fj;*/
      display: flex;
      justify-content: space-between;
      align-items: center;
      .shop_title{
        width: 8.5rem;
        color: #333;
        padding-top: .01rem;
        /*@include font(0.65rem, 0.65rem, 'PingFangSC-Regular');*/
        font: 0.65rem/0.65rem PingFangSC-Regular;
        font-weight: 700;
      }
      .premium::before{
        content: '品牌';
        display: inline-block;
        font-size: 0.5rem;
        line-height: .6rem;
        color: #333;
        background-color: #ffd930;
        padding: 0 0.1rem;
        border-radius: 0.1rem;
        margin-right: 0.2rem;
      }
      .shop_detail_ul{
        display: flex;
        transform: scale(.8);
        margin-right: -0.3rem;
        .supports{
          /*@include sc(0.5rem, #999);*/
          font-size: 0.5rem;
          color: #999;
          border: 0.025rem solid #f1f1f1;
          padding: 0 0.04rem;
          border-radius: 0.08rem;
          margin-left: 0.05rem;
        }
      }
    }
    .rating_order_num{
      /*@include fj(space-between);*/
      display: flex;
      justify-content: space-between;
      height: 0.6rem;
      margin-top: 0.52rem;
      .rating_order_num_left{
        /*@include fj(flex-start);*/
        display: flex;
        justify-content: flex-start;
        .rating_section{
          display: flex;
          .rating_num{
            /*@include sc(0.4rem, #ff6000);*/
            font-size: 0.4rem;
            color: #ff6000;
            margin: 0 0.2rem;
          }
        }
        .order_section{
          transform: scale(.8);
          margin-left: -0.2rem;
          /*@include sc(0.4rem, #666);*/
          font-size: 0.4rem;
          color: #666;
        }
      }
      .rating_order_num_right{
        display: flex;
        align-items: center;
        transform: scale(.7);
        min-width: 5rem;
        justify-content: flex-end;
        margin-right: -0.8rem;
        .delivery_style{
          font-size: 0.4rem;
          padding: 0.04rem 0.08rem 0;
          border-radius: 0.08rem;
          margin-left: 0.08rem;
          border: 1px;
        }
        .delivery_left{
          color: #fff;
          background-color: #3190e8;
          border: 0.025rem solid #3190e8;
        }
        .delivery_right{
          color: #3190e8;
          border: 0.025rem solid #3190e8;
        }
      }
    }
    .fee_distance{
      margin-top: 0.52rem;
      /*@include fj;*/
      display: flex;
      justify-content: space-between;
      /*@include sc(0.5rem, #333);*/
      font-size: 0.5rem;
      color: #333;
      .fee{
        transform: scale(.9);
        /*@include sc(0.5rem, #666);*/
        font-size: 0.5rem;
        color: #666;
      }
      .distance_time{
        transform: scale(.9);
        span{
          color: #999;
        }
        .order_time{
          color: #3190e8;
        }
        .segmentation{
          color: #ccc;
        }
      }
    }
  }
  .loader_more{
    /*@include font(0.6rem, 3);*/
    font: 0.6rem/3 Microsoft YaHei;
    text-align: center;
    color: #999;
  }
  .empty_data{
    /*@include sc(0.5rem, #666);*/
    font-size: 0.5rem;
    color: #666;
    text-align: center;
    line-height: 2rem;
  }
  .return_top{
    position: fixed;
    bottom: 3rem;
    right: 1rem;
    .back_top_svg{
      /*@include wh(2rem, 2rem);*/
      width: 2rem;
      height: 2rem;
    }
  }
  .loading-enter-active, .loading-leave-active {
    transition: opacity 1s
  }
  .loading-enter, .loading-leave-active {
    opacity: 0
  }
</style>
