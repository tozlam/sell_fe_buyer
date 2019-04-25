<template>
  <div class="ratingOrder">

    <div class="user-info">
      <div class="item">
        <label class="label">投诉内容</label>
        <textarea v-bind:maxlength="140" style="width:80%;" @input="descArea" v-model="buyerComplain" name="abstract" id="abstract" placeholder="编写投诉140字以内"></textarea>
      </div>
    </div>
    <div class="user-info">
      <div class="item">
        <label class="label">上传图片</label>
        <input type="file" accept="image/png,image/gif,image/jpeg" class="file" id="fileUp" style="width:80%;" @change="updateImg" placeholder="上传图片">
      </div>
      <div class="item">
        <label class="label">可使用多张图片结合成长图</label>
        <p id="upload_success"></p>
      </div>
    </div>
    <div class="footer">
      <div class="money"></div>
      <div class="btn-pay" @click="createEval">投诉</div>
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
        orderId:'',
        buyerComplain:'',
        complainFile:''
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
      createEval:function () {
        const ERR_OK = 0;
        this.$http.post("/sell/buyer/orderComplain/create",{
          'buyerOpenid': getCookie('openid'),
          'buyerComplain':this.buyerComplain,
          'complainFile':this.complainFile,
          'orderId':this.$route.params.orderId
        }).then(function (response) {
          response = response.body;
          if (response.code == ERR_OK) {
            location.href = '/#/order/' + this.orderId;
          }else {
            alert('投诉失败:' + response.msg)
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
              this.complainFile = response.data.data.fileName;
              document.getElementById('upload_success').innerText='投诉图片上传成功！';
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
