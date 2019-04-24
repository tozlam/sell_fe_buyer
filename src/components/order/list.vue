<template>
    <div infinite-scroll-distance="20" class="orderbody">
    <a  @click="orderDetail(item)" class="ordercard" v-for="item in orderList">
        <div  class="ordercard-body">
            <div  class="ordercard-avatar">
                <img  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555254329033&di=7e86634c53bcf8f0dd1554a0ed85d2bf&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201409%2F10%2F20140910120722_wUVnt.jpeg">
            </div>
            <div  class="ordercard-content">
                <div class="ordercard-head">
                    <div  class="title">
                        <p  class="name">
                            <span  class="content">{{item.createTime | time }}</span>
                            <svg >
                                <use  xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </p>
                        <!--这里使用订单状态和支付状态组合显示
                        订单: 新下单/已完成/已取消
                        支付: 未支付/已支付-->
                        <p  class="status">{{item.orderStatus | formatOrderStatus(item.payStatus) }}</p>
                    </div>
                </div>
                <div  class="ordercard-detail">
                    <p  class="detail">
                      <label style="color: #00a0dc">商店</label>
                      <span class="productname">{{item.shopName}}</span>
                    </p>
                    <p  class="price">¥{{item.orderAmount}}</p>
                </div>
            </div>
        </div>
    </a>
    </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        orderList: [],
          orderStatusName: ''
      };
    },
    created() {
      this.$http.get('/sell/buyer/order/list', {params: {'openid': getCookie('openid')}}).then((response) => {
        response = response.body;
        if (response.code === ERR_OK) {
            this.orderList =  response.data;
        }
      });
    },
    methods: {
        orderDetail: function (item) {
            location.href = '/#/order/' + item.orderId;
        }
    },
    components: {
    },
      filters: {
        time: function (value) {
            var date = new Date(value * 1000);
            return date.getFullYear() + '-'
                + (date.getMonth() + 1) + '-'
                + date.getDate() + ' '
                + date.getHours() + ':'
                + date.getMinutes();
        },
        formatOrderStatus: function (orderStatus, payStatus) {
          if (orderStatus == 1) {
              return '已完成'
          }else if (orderStatus == 2) {
              return '已取消'
          }else if (payStatus == 0) {
              return '未支付'
          }else {
              return '已支付'
          }
        }
      }
  };

  function getCookie(name) {
    var arr;
    var reg = new RegExp('(^| )' +name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  }
//  Vue.filter('time', function (value) {
//      return new Date(parseInt(value) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
//  })
</script>

<style lang="less">
    html, body {
      height: 100%;
    }

    .orderbody {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #f5f5f5;
      margin-bottom: 10px;
      .ordercard {
        display: block;
        padding-top: 10px;
        padding-left: 10px;
        margin-top: 10px;
        background-color: #fff;
      }
      .ordercard-body {
        display: flex;
      }
      .ordercard-avatar {
        flex: none;
        padding-right: 10px;
        img {
          width: 32px;
          height: 32px;
        }
      }
      .ordercard-content {

        flex: 1;
        svg {
          width: 4px;
          height: 4px;
        }
        .ordercard-head {
          padding-right: 10px;
          padding-bottom: 30px;
          border-bottom: 1px solid #eee;
        }
        .ordercard-detail {
          display: flex;
          justify-content: space-between;
          padding-right: 10px;
          align-items: center;
          padding: 10px;
          .price {
            color: #333;
            font-weight: 700;
          }
          
        }
        .title {

          display: flex;
          justify-content: space-between;
        }
      }
    }

</style>
