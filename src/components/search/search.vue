<template>
  <div class="search">
    <div class="search-header">
      <i class="icon-angle-right-white" @click="back"></i>
      <span>搜索</span>
    </div>
    <div class="shop-search">
      <div class="shop-search-box">
        <input v-model="keyword" placeholder="" class="shop-search-input">
        <i class="icon-delete-circle" v-if="keyword !== ''" @click="clearKeyword"></i>
      </div>
      <span @click="search">搜索</span>
    </div>
    <div class="shop-result" v-if="searchResult.length > 0">
      <p>商家</p>
      <div class="shop-result-box">
        <div class="shop-result-item" v-for="item in searchResult">
          <img :src="item.shopImg" width="45" height="45" class="shop-result-item-left">
          <div class="shop-result-item-right">
            <p>{{item.shopName}}</p>
            <p>月销 {{item.sellNum}} 单</p>
            <p>{{item.startPrice}} 元起送&nbsp;/&nbsp;距离 {{item.farFrom}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        keyword: "",
        searchResult: [],
      }
    },
    methods:{
      back(){

      },
      clearKeyword(){
        this.keyword = '';
      },
      search(){
        this.searchResult = [
          {
            shopName: 'qqq',
            sellNum: '12',
            shopImg: '//elm.cangdu.org/img/1682dfd656625253.jpg',
            startPrice: '20',
            farFrom: '10km'
          },
          {
            shopName: 'lll',
            sellNum: '32',
            shopImg: '//elm.cangdu.org/img/1682dfd656625253.jpg',
            startPrice: '19',
            farFrom: '3.3km'
          },
          {
            shopName: 'nnn',
            sellNum: '42',
            shopImg: '//elm.cangdu.org/img/1682dfd656625253.jpg',
            startPrice: '25',
            farFrom: '100m'
          },
        ];
      }
    },
    created(){
      this.$nextTick((x)=> {
        this.$refs.searchInput.focus();
      });
    }
  }
</script>
<style lang="less">
  @rem1px:0.04267rem;
  html, body {
    height: 100%;
    background-color: #f5f5f5;
  }
.search {
.search-header{
  height: 60*@rem1px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0E7CF4;

  .icon-angle-right-white{
    display: inline-block;
    width: 25*@rem1px;
    height: 25*@rem1px;
    background-image: url("/static/image/icon-angle-right-white.png");
    background-size: contain;
    background-repeat: no-repeat;
    transform: rotate(180deg);
    position: absolute;
    top:17*@rem1px;
    left: 20*@rem1px;
  }
  span{
    color: #ffffff;
  }
}

.shop-search{
  border-bottom: 1*@rem1px solid #dddddd;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 84*@rem1px;
.shop-search-box{
  position: relative;
  margin-left:12*@rem1px ;
  width: 402*@rem1px;
  height: 54*@rem1px;
  line-height: 54*@rem1px;
  background: #F5F5F5;
  border-radius: 4*@rem1px;

.icon-search{
  margin-left: 10*@rem1px;
}
.shop-search-input{
  width: 305*@rem1px;
  margin-left: 8*@rem1px;
  background-color: transparent;
  font-family: PingFangSC-Regular;
  font-size: 16*@rem1px;
&:focus{
   outline: none;
 }
}
.icon-delete-circle{
  display: inline-block;
  width: 25*@rem1px;
  height: 25*@rem1px;
  background-image: url("/static/image/icon-delete-circle.png");
  background-size: contain;
  position: absolute;
  right: 15*@rem1px;
  top: 15*@rem1px;
}
}
span{
  font-family: PingFangSC-Regular;
  font-size: 22*@rem1px;
  color: #0E7CF4;
  margin-left:12*@rem1px ;
}
}
  .shop-result{
    width: 100%;
    >p{
       margin: 20*@rem1px;
       font-size: 22*@rem1px;
       font-weight: 500;
       color: #666;
     }
     .shop-result-box{
       .shop-result-item{
         background-color: #ffffff;
         border-bottom: 1*@rem1px solid #ccc;
         padding: 20*@rem1px;
         height: 80*@rem1px;
         position: relative;
         img{
           position: absolute;
           left: 20*@rem1px;
           top:25*@rem1px;
         }
         .shop-result-item-right{
           position: absolute;
           left: 100*@rem1px;
           line-height: 28*@rem1px;
           p{
             color: #444;
             font-size: 18*@rem1px;
           }
         }
        &:last-child{
          border-bottom: none;
         }
       }
     }
  }
}
</style>
