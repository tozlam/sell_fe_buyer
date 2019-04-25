<template>
  <div class="payment">
    <div class="user-info">
                  <div class="item"><label class="label">姓名</label><input placeholder="姓名" class="input" v-model="buyerName" type="text"></div>
                  <div class="item"><label>电话号码</label><input placeholder="电话号码" v-model="buyerPhone" type="text"></div>
                  <div class="item"><label>详细地址</label><input placeholder="详细地址" v-model="buyerAddress" type="text"></div>
    </div>
      <!--<div class="radio-box" v-for="(item,index) in radios" :key="item.id">-->
        <!--<span class="radio" :class="{'on':item.isChecked}"></span>-->
        <!--<input v-model="gender" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index)" type="radio">{{item.label}}-->
      <!--</div>-->
    <div class="user-info">
      <label>性别选择</label>
    <input type='radio' id='male' value='1' v-model='gender'/>
    <label for='male'>男士</label>

    <input type='radio' id='female' value='2' v-model='gender'/>
    <label for='female'>女士</label>
    </div>
    <div class="footer">
      <div class="btn-pay" @click="saveAddress">保存</div>
    </div>
  </div>
</template>
<script >
  const ERR_OK = 0;
  var config = require('config')
  config = process.env.NODE_ENV === 'development' ? config.dev : config.build
  export default {
    data() {
      return {
        buyerName: '',
        buyerPhone: '',
        buyerAddress: '',
        gender:1,
        radios:[
          {
            label: '男士',
            value:'1',
            isChecked: true,
          },
          {
            label: '女士',
            value:'2',
            isChecked: false,
          },
        ]
      };
    },
    computed: {
      // allPay() {
      //   return this.selectedGoods.reduce((a, b) => {
      //     return a + (b.count * b.price);
      //   }, 0);
      // }
    },
    watch: {
      '$route': 'fetchData'
    },
    created() {
      // this.selectedGoods = JSON.parse(window.selectedGoods);
      // this.seller = JSON.parse(window.sellerPay);

    },
    methods: {
      saveAddress() {
        console.log("gender:"+this.gender);
        this.$http.post("/sell/buyer/address/save", {
          'openid': getCookie('openid'),
          'buyerName': this.buyerName,
          'buyerPhone': this.buyerPhone,
          'buyerAddress': this.buyerAddress,
          'buyerGender':this.gender
        }).then((respones) => {
          respones = respones.body;
          if (respones.code == ERR_OK) {
            location.href ='/#/address/list';
          }else {
            alert(respones.msg);
          }
        });
      },
    check(index) {
      // 先取消所有选中项
      this.radios.forEach((item) => {
        item.isChecked = false;
      });
      //再设置当前点击项选中
      this.gender = this.radios[index].value;
      // 设置值，以供传递
      this.radios[index].isChecked = true;
      console.log(this.gender);
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
</script>

<style lang="less" >
  .payment {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;

    /*.radio-box{*/
      /*display: inline-block;*/
      /*position: relative;*/
      /*height: 25px;*/
      /*line-height: 25px;*/
      /*margin-right: 5px;*/
    /*}*/
    /*.input-radio {*/
      /*display: inline-block;*/
      /*position: absolute;*/
      /*opacity: 0;*/
      /*width: 25px;*/
      /*height: 25px;*/
      /*cursor: pointer;*/
      /*left: 0px;*/
      /*outline: none;*/
      /*-webkit-appearance: none;*/
    /*}*/
    /*.radio {*/
      /*display: inline-block;*/
      /*width: 25px;*/
      /*height: 25px;*/
      /*vertical-align: middle;*/
      /*cursor: pointer;*/
     /*// background-image: url(../../assets/images/OS_Box_Empty.png);*/
    /*//  background-repeat: no-repeat;*/
      /*//background-position: 0 0;*/
     /*// background-size: 100% 100%;*/
      /*//雪碧图*/
    /*}*/
    /*.on {*/
     /*// background-image: url(../../assets/images/OS_Box_On.png);*/
     /*// background-size: 100% 100%;*/
      /*//background-position: -25px 0;  //雪碧图*/
    /*}*/
    .user-info {
      margin-top: 10px;
      background-color: #fff;
      margin-bottom: 20px;
      .item {
        padding: 0 14px;
        display: flex;
        border-bottom: 1px solid #eee;
        label {
          padding: 14px 0;
          display:inline-block;
          flex-basis: 93px;
          color: #333;
        }
        input {
          display: block;
          flex: 1;
          outline: 0;
          color: #333;
        }
      }
    }
    .food-info {
      background-color: #fff;
      .avator {
        width: 19px;
        height: 19px;
        margin-right: 10px;
      }
      .card-hd {
        display: flex;
        align-items: center;
        padding: 14px;
        border-bottom: 1px solid #eee;
      }
      .food-item {
        padding: 0 14px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        label {
          display: inline-block;
          padding: 14px 0;
          flex: 1;
          color: #666;
        }
        .mount {
          display: flex;
          flex: 1;
          justify-content: flex-end;
          .number {
            padding-right: 20px;
          }
        }
      }
    }
    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 44px;
      display: flex;
      background-color: #3c3c3c;
      color: #fff;
      .money {
        flex: 1;
        padding-left: 20px;
        line-height: 44px;
      }
      .btn-pay {
        flex-basis: 110px;
        line-height: 44px;
        text-align: center;
        background-color: #56d176;
      }

    }
  }


</style>
