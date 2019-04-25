<template>
  <div class="ratingOrder">
    <div class="user-info">
      <div class="item">
      <label class="label">评价类型</label>
      <select v-model="rateType" style="width:80%;" placeholder="请选择评价类型">
       <option value="3">差评</option>
       <option value="4">好评</option>
      </select>
      </div>
      <!--<div class="item"><label class="label">联系人</label><input placeholder="姓名" class="input" v-model="name" type="text"></div>-->
    </div>
    <div class="user-info">
      <div class="item">
        <label class="label">订单评分</label>
        <select v-model="score" style="width:80%;"  placeholder="请选择订单星数">
          <option value="1">1星</option>
          <option value="2">2星</option>
          <option value="3">3星</option>
          <option value="4">4星</option>
          <option value="5">5星</option>
        </select>
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <label class="label">配送时间</label>
        <select v-model="deliveryTime" style="width:80%;"  placeholder="请选择配送时间">
          <option value="15">15分钟</option>
          <option value="20">20分钟</option>
          <option value="30">30分钟</option>
          <option value="40">40分钟</option>
          <option value="50">50分钟</option>
          <option value="60">60分钟</option>
          <option value="70">大于60分钟</option>
        </select>
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <label class="label">评论内容</label>
        <textarea v-bind:maxlength="140" style="width:80%;" @input="descArea" v-model="buyerEval" name="abstract" id="abstract" placeholder="编写评论"></textarea>
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <label class="label">上传图片</label>
        <input type="file" accept="image/png,image/gif,image/jpeg" class="file" id="fileUp" style="width:80%;" @change="updateImg" placeholder="上传图片">
      </div>
    </div>
    <div class="footer">
      <div class="money"></div>
      <div class="btn-pay" @click="createEval">评论</div>
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
        introduct:'',
        Surplus:140,
        buyerEval:'',
        evalPhoto:'',
        rateType:'',
        score:'',
        deliveryTime:'',
        orderId:''
      };
    },
    computed: {

    },
    // watch: {
    //   '$route': 'fetchData'
    // },
    created() {

    },
    methods: {
      async uploadAvatar(){
        console.log('上传头像!');
        //上传头像
          let input = document.querySelector('.profileinfopanel-upload')
          let data = new FormData();
          data.append('file', input.files[0]);
          try{
            let response = await fetch('/sell/image/upload', {
              method: 'POST',
              //credentials: 'include',
              file_data: data
            })
            let res = await response.json();
            if (res.status == 0) {
              console.log('图片上传成功!');
              this.this.evalPhoto = res.data;
            }
          }catch (error) {
          //  this.showAlert = true;
          //  this.alertText = '上传失败';
            console.log('图片上传失败!');
            alert('上传失败');
            throw new Error(error);
          }
      },
      createEval:function () {
        const ERR_OK = 0;
        this.$http.post("/sell/buyer/orderEval/create",{
          'buyerOpenid': getCookie('openid'),
          'buyerEval':this.buyerEval,
          'score':this.score,
          'rateType':this.rateType,
          'deliveryTime':this.deliveryTime,
          'evalPhoto':this.evalPhoto,
          'orderId':this.$route.params.orderId
        }).then(function (response) {
          response = response.body;
          if (response.code == ERR_OK) {
            location.href = '/#/order/' + this.orderId;
          }else {
            alert('评价失败:' + response.msg)
          }
        });
      },
      descArea(){
        console.log('descArea!');
        var textVal = this.introduct.length;
        this.Surplus = 140 - textVal;
      },
      updateImg(){
      //  let files = Array.from(e.target.files);fileUp
        let fileImg = document.getElementById('fileUp').files[0];
        console.log("当前文件名字："+fileImg.name);
        let param = new FormData(); //创建form对象
        param.append('file_data',fileImg,fileImg.name);//通过append向form对象添加数据
       // param.append('chunk','0');//添加form表单中其他数据
        console.log("当前文件"+param.get('file_data')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };  //添加请求头
        axios.post('/sell/image/upload',param,config)
          .then(response=>{
            //response = response.body;
            if (response.data.code == ERR_OK) {
              console.log("图片上传成功："+response.data);
              this.evalPhoto = response.data.data.fileName;
            }else {
              console.log("code:"+response.code);
              console.log("图片上传失败：");
                alert('图片上传失败');
            }
          })
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

  html, body {
    height: 100%;
  }
  .ratingOrder {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;

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
        select {
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
