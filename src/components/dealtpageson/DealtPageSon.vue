<template>
  <!--这是 选项文件 -->
  <div id="dealtBox">
    <!-- 这是头部 -->
    <div id="dealtBox_top">
      <!-- 搜索框头 -->
      <div class="dealtBox_top_inp">
        <input
          type="text"
          name=""
          id=""
          placeholder="search"
          v-model="search"
          @keyup="searchfun()"
        />
        <!-- @keyup="searchfun()" -->

        <img src="../../assets//redu/搜索.png" alt="" />
      </div>
      <div
        class="dealtBox_top_son"
        v-for="(item, index) in flag ? newarr : daydata"
        :key="index"
        :class="{ active: index === activeTab }"
        @click="activeTab = index"
      >
        <ul>
          <li @click="updateGaizi(item.wenzi)">
            <p>
              <img :src="item.img" alt="" />
              <span>{{ item.wenzi }}</span>
            </p>
            <span>{{ item.digit }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 添加 -->
    <div class="xian"></div>
    <!-- <div id="dealtBoxadd">
      <child-component></child-component>
    </div> -->
  </div>
</template>
<script>
// import ChildComponent from "@/components/dealtpageson/DealtPageAdd.vue"; //添加子组件
import Bus from "@/api/bus.js";
export default {
  //   name: "ChildComponent ",
  props: ["gaizi"],
  components: {
    // ChildComponent,
  },
  data() {
    return {
      newarr: [],
      search: "",
      flag: false,
      activeTab: 0,
      //天
      savedDataLength: null,
      localData: localStorage.getItem("datyoua"),
      savedData: [],
      bus: [],
      daydata: [
        {
          img: "https://img1.baidu.com/it/u=2953940086,3621245794&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1692378000&t=30196ba1521e6c6452bffd8c5d9182be",
          wenzi: "所有",
          digit: 0,
        },
        {
          img: "https://img0.baidu.com/it/u=1928632694,1581828195&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1692378000&t=e2b09085cfe7cf574d1609acad1adb41",
          wenzi: "今天",
          digit: 0,
        },
        {
          img: "https://img0.baidu.com/it/u=600328707,3822405498&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1692378000&t=d8084b29c5aea53d532920c5bcec78e8",
          wenzi: "最近七天",
          digit: 0,
        },
      ],
    };
  },
  methods: {
    //搜索
    searchfun() {
      if (this.search != "") {
        this.bus.filter((item) => {
          if (item.name.includes(this.search)) {
            let box = [];
            box.push(item);
            Bus.$emit("setBusBox", box);
          }
        });
      } else {
        console.log("111", this.bus);
        Bus.$emit("setBusBox", this.bus);
      }
    },
    updateGaizi(wenzi) {
      this.$emit("update:gaizi", wenzi);
    },
  },
  mounted() {
    Bus.$on("setBus", (data) => {
      this.bus = data;
      console.log(this.bus, "2222");
    });
    this.daydata.forEach((item) => {
      item.digit = JSON.parse(localStorage.getItem("datyoua")).length;
    });
    window.addEventListener("setItem", () => {
      this.daydata.forEach((item) => {
        return (item.digit = JSON.parse(
          localStorage.getItem("datyoua")
        ).length);
      });
    });
  },
};
</script>

<style lang="less" scoped>
//添加样式
// #dealtBoxadd {
//   width: 90%;
//   margin: auto;
//   height: 90px;
//   margin-top: 15px;
// }
.active {
  color: #fff !important;
  border-left: 3px solid #1890ff;
  background-color: #1b2835;
}

.xian {
  width: 90%;
  margin: auto;
  border-bottom: 1px solid #ccc;
  margin-top: 10px;
}
#dealtBox {
  width: 100%;
  background-color: pink;
  //搜索头
  .dealtBox_top_inp {
    // width: 219px;
    height: 40px;
    width: 90%;
    margin: auto;
    border-radius: 10px;
    display: flex;
    background-color: #25252c;
    justify-content: space-between;
    margin-top: 5px;
    input {
      width: 100%;
      height: 30px;
      margin-top: 5px;
      background-color: #25252c;
      margin-left: 10px;
      border: none;
      color: #fff;
    }
    img {
      width: 40px;
      height: 40px;
      margin-top: 0px;
    }
  }
  .dealtBox_top_inp:hover {
    border: 1.5px solid #ddd;
  }
  .dealtBox_top_son {
    width: 90%;
    border-radius: 10px;
    margin: auto;
    height: 40px;
    margin-top: 10px;
    line-height: 40px;
    ul li {
      color: #545454;
      display: flex;
      justify-content: space-between;
      p {
        span {
          margin-left: 10px;
        }
      }
      img {
        width: 10px;
        height: 10px;
        margin-left: 10px;
        margin-top: 15px;
      }
      span {
        float: right;
        margin-right: 10px;
      }
    }
  }
  .dealtBox_top_son:hover {
    background-color: #1b2835;
  }
}
</style>