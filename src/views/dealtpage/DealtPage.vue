<template>
  <div id="dealt">
    <!-- 小盒子 -->
    <div id="dealt_sonbox" @click="biandabox" v-show="showboxson">
      <div id="dealt_sonbox_son">
        <img src="../../assets/redu/对勾_块.png" alt="" />
      </div>
      <p>待办事项</p>
    </div>
    <!-- 变大的盒子 -->
    <div
      id="dealtBox"
      :class="{ largepage: isLarge, app: !isLarge }"
      v-show="showbox"
    >
      <div class="fangda">
        <div class="gaibian">{{ gaizi }}</div>
        <img
          src="../../assets/redu/放大.png"
          alt=""
          v-show="fangdason"
          @click="dafang"
        />
        <img
          src="../../assets/redu/缩小.png"
          alt=""
          v-show="suoxiaoson"
          @click="xiao"
        />
        <img src="../../assets/redu/叉号.png" alt="" @click="del" />
      </div>
      <div id="dealtBoxzuoyou">
        <div id="dealtBoxzuoyou_zuo">
          <DealtPageSon :gaizi.sync="gaizi"></DealtPageSon>
          <DealtPageAdd :gaizi.sync="gaizi"></DealtPageAdd>
        </div>
        <div id="dealtBoxzuoyou_you">
          <DealtPageData></DealtPageData>
        </div>
      </div>
      <div id="jiao"></div>
    </div>
  </div>
</template>
<script>
//引入子组件
import DealtPageSon from "../../components/dealtpageson/DealtPageSon.vue"; //左边
import DealtPageAdd from "../../components/dealtpageson/DealtPageAdd.vue"; //左下边
import DealtPageData from "../../components/dealtpageson/DealtPageData.vue"; //右边数据
export default {
  components: {
    DealtPageSon,
    DealtPageAdd,
    DealtPageData,
  },
  data() {
    return {
      gaizi: "所有",
      yincang: false,
      isLarge: false,
      fangdason: true,
      showboxson: true,
      showbox: true,
      suoxiaoson: false,
    };
  },
  methods: {
    updateGaizi(wenzi) {
      this.gaizi = wenzi;
    },
    dafang() {
      this.isLarge = !this.isLarge; // 切换页面大小
      this.suoxiaoson = true;
      this.fangdason = false;
    },

    xiao() {
      this.isLarge = !this.isLarge; // 切换页面大小
      this.fangdason = true;
      this.suoxiaoson = false;
    },
    //变大 页面
    biandabox() {
      this.showbox = true;
      this.showboxson = false;
    },
    //关闭 页面
    del() {
      this.showboxson = true;
      this.showbox = false;
    },
  },
};
</script>


<style lang="less" scoped>
#jiao {
  position: fixed;
  bottom: 0px;
  width: 60%;
  height: 3px;
  background-color: red;
}
.gaibian {
  width: 100px;
  margin-right: 730px;
  line-height: 36px;
  color: #fff;
  font-weight: 900;
  font-size: 19px;
  -webkit-line-clamp: 1; /* 设置几行  */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
// #dealtBoxzuoyou::-webkit-scrollbar {
//   display: none;
// }
#dealtBoxzuoyou {
  width: 100%;
  height: 95vh;
  //   overflow: auto;
  margin-top: 40px;
  display: flex;
  #dealtBoxzuoyou_zuo {
    width: 20%;
    height: 95vh;
    overflow: auto;
    background-color: #1c1c1e;
  }
  #dealtBoxzuoyou_zuo::-webkit-scrollbar {
    display: none;
  }
  #dealtBoxzuoyou_you {
    overflow: auto;
    width: 80%;
    height: 95vh;
    background-color: #16161a;
  }
  #dealtBoxzuoyou_you::-webkit-scrollbar {
    display: none;
  }
}

//小盒子样式
#dealt_sonbox {
  width: 260px;
  height: 120px;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;

  p {
    color: #fff;
    text-align: center;
    margin-top: 5px;
  }

  #dealt_sonbox_son {
    width: 240px;
    height: 100px;
    border-radius: 10px;
    background-color: #163f83;
    display: flex;
    justify-content: center;

    img {
      width: 100px;
      height: 80px;
      margin-top: 10px;
      text-align: center;
    }
  }
}

#dealt {
  width: 100%;
  height: 100vh;
  background: url(https://img0.baidu.com/it/u=624935653,63733161&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1691946000&t=87a7ff58ddb49a0ae12cff9b03b0a259)
    no-repeat;
  background-size: 100% 100%;
}

.fangda {
  display: flex;
  position: absolute;
  top: 0px;
  right: 0px;

  img {
    width: 25px;
    height: 30px;
    margin-right: 10px;
  }
}

#dealtBox {
  width: 100%;
  // height: 80vh;
  background-color: #1c1c1ee8;
  // border-bottom: 5px solid red;
}

.largepage {
  width: 100%;
  height: 100vh;
  background-color: #1c1c1e;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0px;
  transition: all 0.3s ease;
}

.app {
  width: 75% !important;
  // height: 90vh !important;
  overflow: auto;
  background-color: #1c1c1e;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  transition: all 0.3s ease;
}

//右bian
.app::-webkit-scrollbar {
  display: none;
}
</style>
