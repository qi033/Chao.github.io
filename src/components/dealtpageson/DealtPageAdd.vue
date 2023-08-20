<template>
  <!-- 这是添加文件 -->
  <div id="AddBox">
    <div
      class="dealtBox_top_son"
      v-for="(item, index) in daydata"
      :key="index"
      @mouseenter="showIcon = index"
      @mouseleave="showIcon = null"
      :class="{ active: index === activeTab }"
      @click="activeTab = index"
    >
      <ul>
        <li @click="updateGaizi(item.wenzi)">
          <p>
            <img :src="item.img" alt="" />
            <b v-if="title == index ? false : true" @dblclick="start(index)">{{
              item.wenzi
            }}</b>
            <input
              v-else
              ref="inputFiels"
              type="text"
              v-model="item.wenzi"
              @keydown.enter="finishEditing"
              style="
                width: 100px;
                background-color: #1c1c1e;
                margin-left: 10px;
                border: 1px solid #fff;
                color: #fff;
                height: 25px;
              "
            />
          </p>
          <span>{{ item.digit }}</span>
          <span v-if="showIcon === index" @click="deleteItem(index)">
            <i class="el-icon-delete"></i>
          </span>
          <!-- 添加的删除按钮 -->
        </li>
      </ul>
    </div>
    <div class="dealtBox_bottom_son" @click="addTodo">
      <p>&nbsp;➕ &nbsp;新建列表</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["gaizi"],
  data() {
    return {
      showIcon: null,
      title: null,
      wocao: false,
      daydata: [
        {
          img: "https://img1.baidu.com/it/u=2953940086,3621245794&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1692378000&t=30196ba1521e6c6452bffd8c5d9182be",
          wenzi: "待办事项",
          digit: 0,
        },
      ],
      isHovered: false,
    };
  },
  created() {
    // 获取本地存储的数据
    const savedData = localStorage.getItem("item");
    if (savedData) {
      this.daydata = JSON.parse(savedData);
    }
  },
  methods: {
    start(value) {
      this.title = value;
    },
    finishEditing() {
      localStorage.setItem("item", JSON.stringify(this.daydata));
      this.title = null;
    },
    updateGaizi(wenzi) {
      this.$emit("update:gaizi", wenzi);
    },
    //添加
    addTodo() {
      const newItem = { ...this.daydata[0] };
      this.daydata.push(newItem);
      localStorage.setItem("item", JSON.stringify(this.daydata));
    },
    // 删除
    deleteItem(index) {
      if (confirm("确定删除吗")) {
        this.daydata.splice(index, 1);
        localStorage.setItem("item", JSON.stringify(this.daydata));
      }
    },
  },

  mounted() {
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
.active {
  color: #fff !important;
  border-left: 3px solid #1890ff;
  background-color: #1b2835;
}

#AddBox {
  //   height: 570px;
  .dealtBox_bottom_son {
    line-height: 30px;
    width: 100%;
    height: 30px;
    position: fixed;
    bottom: 10px;
    color: #545454;
  }
  .dealtBox_top_son {
    width: 100%;
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
        display: flex;
        b {
          width: 100px;
          margin-left: 10px;
          font-weight: 500;
          -webkit-line-clamp: 1; /* 设置几行  */
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        input {
          margin-top: 10px;
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
    span {
      display: inline-block;
    }
    span:nth-child(1) {
      display: none;
    }
    li:hover span:nth-child(1) {
      display: inline-block;
    }
    li:hover span:nth-child(2) {
      display: none;
    }
  }
  .dealtBox_top_son:hover {
    background-color: #1b2835;
  }
}
</style>

